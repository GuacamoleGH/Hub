/**
 * =====================================================================
 * LÓGICA PRINCIPAL DE LA APLICACIÓN - GUACAMOLE SERVER HUB
 * =====================================================================
 * Controla el renderizado de servicios, filtrado reactivo, reloj,
 * atajos de teclado y gestión de temas (Light/Dark).
 * =====================================================================
 */

(function () {
  'use strict';

  // Verificación de configuración
  const config = window.HUB_CONFIG || {};
  const services = config.services || [];
  const categories = config.categories || {};

  // Estado reactivo de la aplicación
  const state = {
    activeCategory: 'all', // 'all' | 'public' | 'private'
    searchQuery: '',
    theme: localStorage.getItem('guacamole_hub_theme') || config.ui?.defaultTheme || 'dark',
    view: localStorage.getItem('guacamole_hub_view') || config.ui?.defaultView || 'grid', // 'grid' | 'list'
  };

  // Referencias a elementos del DOM
  const elements = {
    html: document.documentElement,
    grid: document.getElementById('services-grid'),
    searchInput: document.getElementById('search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    searchBadge: document.getElementById('search-shortcut-badge'),
    filterTabsContainer: document.getElementById('categories-filter-bar'),
    sectionTitle: document.getElementById('section-title'),
    sectionCount: document.getElementById('section-count'),
    viewGridBtn: document.getElementById('view-grid-btn'),
    viewListBtn: document.getElementById('view-list-btn'),
    clockTime: document.getElementById('clock-time'),
    clockDate: document.getElementById('clock-date'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    shortcutsModal: document.getElementById('shortcuts-modal'),
    shortcutsBtn: document.getElementById('shortcuts-btn'),
    closeModalBtn: document.getElementById('close-modal-btn'),
  };

  /**
   * Inicialización de la aplicación
   */
  function init() {
    initTheme();
    initView();
    initClock();
    renderCategoryFilters();
    renderServices();
    initEvents();
    initShortcuts();
  }

  /* -------------------------------------------------------------------
     Gestión de Temas (Dark / Light)
     ------------------------------------------------------------------- */
  function initTheme() {
    elements.html.setAttribute('data-theme', state.theme);
    updateThemeButtonIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    elements.html.setAttribute('data-theme', state.theme);
    localStorage.setItem('guacamole_hub_theme', state.theme);
    updateThemeButtonIcon();
  }

  function updateThemeButtonIcon() {
    if (!elements.themeToggleBtn) return;
    const isDark = state.theme === 'dark';
    elements.themeToggleBtn.innerHTML = window.getIconSvg(isDark ? 'sun' : 'moon', 'icon');
    elements.themeToggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
    elements.themeToggleBtn.setAttribute(
      'title',
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }

  /* -------------------------------------------------------------------
     Gestión de Modo de Vista (Cuadrícula / Lista)
     ------------------------------------------------------------------- */
  function initView() {
    setView(state.view);
  }

  function setView(viewMode) {
    state.view = viewMode === 'list' ? 'list' : 'grid';
    localStorage.setItem('guacamole_hub_view', state.view);

    if (elements.grid) {
      elements.grid.classList.toggle('view-list', state.view === 'list');
    }

    if (elements.viewGridBtn) {
      const isGrid = state.view === 'grid';
      elements.viewGridBtn.classList.toggle('active', isGrid);
      elements.viewGridBtn.setAttribute('aria-pressed', isGrid ? 'true' : 'false');
    }

    if (elements.viewListBtn) {
      const isList = state.view === 'list';
      elements.viewListBtn.classList.toggle('active', isList);
      elements.viewListBtn.setAttribute('aria-pressed', isList ? 'true' : 'false');
    }
  }

  /* -------------------------------------------------------------------
     Reloj y Fecha en Vivo
     ------------------------------------------------------------------- */
  function initClock() {
    if (!config.ui?.enableClock) return;

    function update() {
      const now = new Date();
      if (elements.clockTime) {
        elements.clockTime.textContent = now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: !config.ui?.clockFormat24h,
        });
      }
      if (elements.clockDate && config.ui?.showDate) {
        // Formato: ej. Sábado, 31 oct
        const dateStr = now.toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });
        elements.clockDate.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
      }
    }

    update();
    setInterval(update, 1000);
  }

  /* -------------------------------------------------------------------
     Filtros por Categoría
     ------------------------------------------------------------------- */
  function renderCategoryFilters() {
    if (!elements.filterTabsContainer) return;

    // Pestaña inicial para todos los servicios
    const tabs = [
      { id: 'all', name: 'Todos', count: services.length },
    ];

    // Generar pestañas dinámicamente según las categorías activas en config.js
    Object.keys(categories).forEach(catKey => {
      const cat = categories[catKey];
      const count = services.filter(s => s.category === catKey).length;
      tabs.push({
        id: catKey,
        name: cat.shortName || cat.name,
        count: count,
      });
    });

    elements.filterTabsContainer.innerHTML = tabs
      .map(
        tab => `
      <button 
        type="button" 
        class="filter-tab ${state.activeCategory === tab.id ? 'active' : ''}" 
        data-category="${tab.id}"
        role="tab"
        aria-selected="${state.activeCategory === tab.id}"
      >
        <span>${tab.name}</span>
        <span class="filter-count">${tab.count}</span>
      </button>
    `
      )
      .join('');
  }

  /* -------------------------------------------------------------------
     Filtrado y Renderizado de Servicios
     ------------------------------------------------------------------- */
  function getFilteredServices() {
    const query = state.searchQuery.trim().toLowerCase();

    return services.filter(service => {
      // Filtro por categoría
      if (state.activeCategory !== 'all' && service.category !== state.activeCategory) {
        return false;
      }

      // Filtro por texto de búsqueda
      if (query) {
        const titleMatch = service.title.toLowerCase().includes(query);
        const descMatch = service.description.toLowerCase().includes(query);
        const tagMatch = service.tags && service.tags.some(tag => tag.toLowerCase().includes(query));
        const urlMatch = service.url.toLowerCase().includes(query) || (service.displayUrl && service.displayUrl.toLowerCase().includes(query));
        return titleMatch || descMatch || tagMatch || urlMatch;
      }

      return true;
    });
  }

  function renderServices() {
    if (!elements.grid) return;

    const filtered = getFilteredServices();

    // Actualizar título y contador
    updateSectionMeta(filtered.length);

    // Estado sin resultados
    if (filtered.length === 0) {
      renderEmptyState();
      return;
    }

    elements.grid.innerHTML = filtered
      .map(service => {
        const catInfo = categories[service.category] || {};
        const isPublic = service.accessType === 'public';
        const isAuto = service.category === 'automations';

        let badgeClass = 'public';
        let badgeText = 'Cloudflare';
        let badgeIcon = 'globe';

        if (isAuto) {
          badgeClass = 'automation';
          badgeText = 'Segundo Plano';
          badgeIcon = 'cpu';
        } else if (!isPublic) {
          badgeClass = 'private';
          badgeText = 'Tailscale VPN';
          badgeIcon = 'shield';
        }

        const displayUrl = service.displayUrl || service.url.replace(/^https?:\/\//, '');

        return `
        <article class="service-card fade-in" data-category="${service.category}" tabindex="0">
          <div class="card-primary-wrapper">
            <div class="card-header">
              <div class="card-icon-box" title="Icono de ${service.title}">
                ${window.getIconSvg(service.icon, 'icon-lg')}
              </div>
              <span class="card-access-badge ${badgeClass}">
                ${window.getIconSvg(badgeIcon, 'icon-sm')}
                <span>${badgeText}</span>
              </span>
            </div>

            <div class="card-content">
              <div class="card-title-row">
                <h3 class="card-title">${escapeHtml(service.title)}</h3>
              </div>
              <p class="card-description">${escapeHtml(service.description)}</p>
            </div>
          </div>

          <div class="card-footer">
            <span class="card-url-preview" title="${service.url}">${escapeHtml(displayUrl)}</span>
            <a 
              href="${service.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="card-action-btn"
              aria-label="Abrir ${escapeHtml(service.title)} en una nueva pestaña"
            >
              <span>Abrir</span>
              ${window.getIconSvg('external-link', 'icon-sm')}
            </a>
          </div>
        </article>
      `;
      })
      .join('');

    // Permitir clic en toda la tarjeta si se hace clic fuera del botón directo
    const cards = elements.grid.querySelectorAll('.service-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-action-btn')) return; // No duplicar si pulsa el enlace
        const link = card.querySelector('.card-action-btn');
        if (link) {
          window.open(link.getAttribute('href'), '_blank', 'noopener,noreferrer');
        }
      });

      // Navegación por teclado (Enter en la tarjeta)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.target.closest('.card-action-btn')) {
          const link = card.querySelector('.card-action-btn');
          if (link) {
            window.open(link.getAttribute('href'), '_blank', 'noopener,noreferrer');
          }
        }
      });
    });
  }

  function renderEmptyState() {
    elements.grid.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon">
          ${window.getIconSvg('search', 'icon-lg')}
        </div>
        <h4 class="empty-state-title">No se encontraron servicios</h4>
        <p class="empty-state-desc">
          No hay aplicaciones que coincidan con "<strong>${escapeHtml(state.searchQuery)}</strong>"
          ${state.activeCategory !== 'all' ? ` en la categoría seleccionada.` : '.'}
        </p>
        <button type="button" class="empty-state-btn" id="reset-search-btn">
          Restablecer búsqueda
        </button>
      </div>
    `;

    const resetBtn = document.getElementById('reset-search-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.activeCategory = 'all';
        if (elements.searchInput) elements.searchInput.value = '';
        if (elements.searchClearBtn) elements.searchClearBtn.style.display = 'none';
        if (elements.searchBadge) elements.searchBadge.style.opacity = '1';
        renderCategoryFilters();
        renderServices();
      });
    }
  }

  function updateSectionMeta(count) {
    if (elements.sectionTitle) {
      if (state.searchQuery) {
        elements.sectionTitle.textContent = `Resultados de búsqueda`;
      } else if (state.activeCategory === 'all') {
        elements.sectionTitle.textContent = `Todos los servicios`;
      } else {
        const cat = categories[state.activeCategory];
        elements.sectionTitle.textContent = cat ? cat.name : 'Servicios';
      }
    }

    if (elements.sectionCount) {
      elements.sectionCount.textContent = `${count} ${count === 1 ? 'servicio' : 'servicios'}`;
    }
  }

  /* -------------------------------------------------------------------
     Manejadores de Eventos
     ------------------------------------------------------------------- */
  function initEvents() {
    // Alternancia de tema
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Buscador en tiempo real con debounce ligero
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        const hasText = state.searchQuery.length > 0;

        if (elements.searchClearBtn) {
          elements.searchClearBtn.style.display = hasText ? 'inline-flex' : 'none';
        }
        if (elements.searchBadge) {
          elements.searchBadge.style.opacity = hasText ? '0' : '1';
        }

        renderServices();
      });
    }

    // Botón borrar búsqueda
    if (elements.searchClearBtn) {
      elements.searchClearBtn.addEventListener('click', () => {
        state.searchQuery = '';
        elements.searchInput.value = '';
        elements.searchClearBtn.style.display = 'none';
        if (elements.searchBadge) elements.searchBadge.style.opacity = '1';
        elements.searchInput.focus();
        renderServices();
      });
    }

    // Delegación de clics en las pestañas de categorías
    if (elements.filterTabsContainer) {
      elements.filterTabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.filter-tab');
        if (!tabBtn) return;

        const cat = tabBtn.getAttribute('data-category');
        if (cat === state.activeCategory) return;

        state.activeCategory = cat;
        renderCategoryFilters();
        renderServices();
      });
    }

    // Alternancia de vista (Cuadrícula / Lista)
    if (elements.viewGridBtn) {
      elements.viewGridBtn.addEventListener('click', () => setView('grid'));
    }
    if (elements.viewListBtn) {
      elements.viewListBtn.addEventListener('click', () => setView('list'));
    }

    // Modal de Atajos
    if (elements.shortcutsBtn) {
      elements.shortcutsBtn.addEventListener('click', () => openModal());
    }

    if (elements.closeModalBtn) {
      elements.closeModalBtn.addEventListener('click', () => closeModal());
    }

    if (elements.shortcutsModal) {
      elements.shortcutsModal.addEventListener('click', (e) => {
        if (e.target === elements.shortcutsModal) closeModal();
      });
    }
  }

  function openModal() {
    if (elements.shortcutsModal) {
      elements.shortcutsModal.classList.add('open');
      elements.shortcutsModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (elements.shortcutsModal) {
      elements.shortcutsModal.classList.remove('open');
      elements.shortcutsModal.setAttribute('aria-hidden', 'true');
    }
  }

  /* -------------------------------------------------------------------
     Atajos de Teclado Globales
     ------------------------------------------------------------------- */
  function initShortcuts() {
    if (!config.ui?.enableShortcuts) return;

    window.addEventListener('keydown', (e) => {
      // Ignorar si el usuario está escribiendo en un input salvo Escape
      const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

      // Atajo: '/' o 'Ctrl + K' para enfocar búsqueda
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !isInput) {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
          elements.searchInput.select();
        }
      }

      // Atajo: 'Escape' para limpiar búsqueda o cerrar modal
      if (e.key === 'Escape') {
        if (elements.shortcutsModal && elements.shortcutsModal.classList.contains('open')) {
          closeModal();
          return;
        }

        if (elements.searchInput && (document.activeElement === elements.searchInput || state.searchQuery)) {
          state.searchQuery = '';
          elements.searchInput.value = '';
          if (elements.searchClearBtn) elements.searchClearBtn.style.display = 'none';
          if (elements.searchBadge) elements.searchBadge.style.opacity = '1';
          elements.searchInput.blur();
          renderServices();
        }
      }

      // Atajo: '?' para abrir ayuda de atajos
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        openModal();
      }

      // Atajo: 't' para cambiar tema
      if (e.key.toLowerCase() === 't' && !isInput) {
        e.preventDefault();
        toggleTheme();
      }

      // Atajo: 'v' para alternar vista (Cuadrícula / Lista)
      if (e.key.toLowerCase() === 'v' && !isInput) {
        e.preventDefault();
        setView(state.view === 'grid' ? 'list' : 'grid');
      }
    });
  }

  /* -------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------- */
  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

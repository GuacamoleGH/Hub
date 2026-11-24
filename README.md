# 🥑 Guacamole Hub

Panel de inicio y dashboard de acceso centralizado para aplicaciones y servicios. Diseñado con una interfaz moderna, oscura y elegante, de alto rendimiento y 100% estática.

![Versión](https://img.shields.io/badge/versión-1.2.0-10b981?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-MIT-06b6d4?style=flat-square)

---

## ✨ Características Principales

- **Diseño Dashboard Premium:** Estética oscura por defecto inspirada en dashboards modernos de alta gama (con paleta de obsidian y pizarra), además de selector de modo claro persistente.
- **Doble Modo de Vista (Cuadrícula / Lista):** Selector interactivo y persistente para alternar entre vista de tarjetas visuales o filas compactas (atajo tecla `V`).
- **Buscador en Tiempo Real:** Filtra instantáneamente por nombre de servicio, descripción, etiquetas o URLs.
- **Categorización Visual Clara:**
  - 🌐 **Aplicaciones Públicas:** Accesibles bajo el dominio `guacamolegh.es`.
  - 🔒 **Servicios Privados:** Protegidos y accesibles dentro de la red privada.
- **Categoría por Defecto Inteligente:** Acceso inmediato a la pestaña de aplicaciones públicas (`defaultCategory: 'public'`).
- **Zero Dependencias Externas:** Iconos vectoriales SVG limpios e integrados (sin fuentes ni CDNs externos como FontAwesome o Google Fonts). Funciona perfectamente en entornos aislados o sin conexión a internet.
- **Accesibilidad & UX:** Totalmente navegable por teclado, estados de foco visibles y atajos integrados (`/` o `Ctrl + K` para buscar, `Esc` para limpiar, `T` para alternar tema y `?` para ver atajos).
- **Reloj y Fecha en Vivo:** Barra superior con indicador en tiempo real y tipografía monoespaciada para administración de sistemas.
- **Configuración Centralizada:** Todas las aplicaciones, URLs y categorías se configuran en un único archivo (`assets/js/config.js`).
- **Arquitectura Ultraligera:** Aplicación puramente estática, sin dependencias pesadas y optimizada para máxima velocidad.

---

## 📁 Estructura del Proyecto

```text
Hub/
├── assets/
│   ├── css/
│   │   └── style.css            # Hoja de estilos moderna, responsive y con temas (Dark/Light)
│   ├── js/
│   │   ├── config.js            # Configuración central de servicios, categorías y opciones
│   │   ├── icons.js             # Diccionario de iconos SVG vectoriales autónomos
│   │   └── app.js               # Lógica del dashboard: buscador, reloj, atajos y renderizado
│   └── favicon.svg              # Favicon SVG vectorial optimizado
├── index.html                   # Documento HTML principal
└── README.md                    # Documentación completa del proyecto
```

---

## 🛠️ Servicios Preconfigurados

### 1. Aplicaciones Públicas (`guacamolegh.es`)
| Servicio | Subdominio | Descripción |
| :--- | :--- | :--- |
| **Atlas** | `https://atlas.guacamolegh.es` | Aplicación web personal |
| **Gestión del coche** | `https://coche.guacamolegh.es` | Mantenimiento, repostajes y gastos con LubeLogger |
| **Games** | `https://games.guacamolegh.es` | Catálogo de juegos arcade clásicos para navegador |
| **Flags** | `https://flags.guacamolegh.es` | Quiz web interactivo bilingüe de banderas de los 196 países oficiales del mundo para el ecosistema GuacamoleGH |
| **MeTube** | `https://metube.guacamolegh.es` | Interfaz web de descarga de vídeos vía yt-dlp |
| **Share** | `https://share.guacamolegh.es` | Plataforma segura para transferir y compartir archivos con subidas fragmentadas |
| **OSINT Hub** | `https://osint.guacamolegh.es` | Portal personal de inteligencia de fuentes abiertas (OSINT), herramientas de investigación y retos |

### 2. Servicios Privados (Red Local / `guacamolegh.es`)
| Servicio | Dominio Privado | Descripción |
| :--- | :--- | :--- |
| **Uptime Kuma** | `https://uptime.guacamolegh.es` | Monitorización de estado y latencia |
| **Beszel** | `https://beszel.guacamolegh.es` | Monitorización ligera de CPU, RAM, disco y red |
| **Stirling PDF** | `https://stirling.guacamolegh.es` | Herramientas integrales para manipulación de PDFs |

---

## ⚙️ Configuración y Personalización

El archivo [`assets/js/config.js`](assets/js/config.js) contiene toda la información de las aplicaciones.

En el Hub, cada tarjeta apunta directamente a su subdominio:

```javascript
{
  id: "uptime-kuma",
  title: "Uptime Kuma",
  category: "private",
  description: "Monitorización en tiempo real del estado, latencia y disponibilidad de servicios.",
  url: "https://uptime.guacamolegh.es",
  displayUrl: "uptime.guacamolegh.es",
  icon: "activity",
  accessType: "private",
  tags: ["uptime", "kuma", "monitor", "ping", "estado", "alertas"],
  featured: false
}
```

### Cómo añadir un nuevo servicio
Simplemente añade un objeto al array `services` en [`assets/js/config.js`](assets/js/config.js):

```javascript
{
  id: "jellyfin",
  title: "Jellyfin",
  category: "private", // "public" | "private"
  description: "Plataforma multimedia para streaming de películas, series y música.",
  url: "https://jellyfin.guacamolegh.es",
  displayUrl: "jellyfin.guacamolegh.es",
  icon: "tv", // Nombre del icono definido en icons.js
  accessType: "private",
  tags: ["media", "streaming", "peliculas", "jellyfin"],
  featured: false
}
```

---

## 💻 Ejecución en Entorno Local

Como es una aplicación puramente estática (HTML, CSS y JS estándar), no requiere instalación de dependencias ni compilación (`npm build`).

### Opción 1: Abrir directamente
Abre el archivo `index.html` en tu navegador.

### Opción 2: Con Python
```bash
python -m http.server
```

### Opción 3: Con Node / npx
```bash
npx serve .
```

---

## 🔄 Actualización desde GitHub (`git pull`)

Para obtener los últimos cambios:

```bash
git pull origin main
```

---

## ⌨️ Atajos de Teclado Disponibles

| Atajo | Acción |
| :--- | :--- |
| `/` o `Ctrl + K` | Enfocar la barra de búsqueda inmediatamente |
| `Esc` | Limpiar la búsqueda activa / Cerrar ventanas modales |
| `T` | Alternar entre tema Oscuro y Claro |
| `V` | Alternar entre vista en Cuadrícula y Lista |
| `?` | Abrir la ventana de ayuda con los atajos |

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de modificarlo y adaptarlo a tu propio uso.

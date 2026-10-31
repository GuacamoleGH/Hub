/**
 * =====================================================================
 * CONFIGURACIÓN CENTRAL DEL HUB - GUACAMOLE SERVER
 * =====================================================================
 * Este archivo centraliza la configuración general del dashboard y la
 * lista de servicios disponibles.
 * 
 * INSTRUCCIONES DE ACTUALIZACIÓN:
 * 1. Para cambiar URLs privadas de Tailscale: sustituye "servidor-tailscale:PUERTO"
 *    por el nombre MagicDNS de Tailscale (ej: "http://ubuntu-server:8080") o su IP privada (ej: "http://100.x.y.z:8080").
 * 2. Para añadir un servicio: duplica uno de los bloques y ajusta sus propiedades.
 * 3. Los iconos disponibles se definen en "assets/js/icons.js".
 * =====================================================================
 */

window.HUB_CONFIG = {
  // Configuración general del servidor y de la interfaz
  server: {
    name: "Guacamole Server",
    tagline: "Panel de Inicio & Servicios",
    environment: "Producción",
    version: "v1.1.0",
    repoUrl: "https://github.com/GuacamoleGH/Hub",
    footerText: "Guacamole Server © 2026 — Desplegado con Docker & Nginx",
  },

  // Ajustes de visualización y comportamiento
  ui: {
    defaultTheme: "dark", // "dark" | "light"
    enableClock: true,
    clockFormat24h: true,
    showDate: true,
    openInNewTab: true,
    enableShortcuts: true,
  },

  // Categorías de servicios para el filtrado visual
  categories: {
    public: {
      id: "public",
      name: "Aplicaciones Públicas",
      shortName: "Públicas",
      badge: "Cloudflare Tunnel",
      badgeType: "public",
      icon: "globe",
      description: "Servicios accesibles desde internet mediante Cloudflare Tunnel y dominio propio.",
    },
    private: {
      id: "private",
      name: "Servicios Privados",
      shortName: "Privados",
      badge: "Tailscale VPN",
      badgeType: "private",
      icon: "shield",
      description: "Servicios protegidos accesibles exclusivamente desde la red interna mediante Tailscale.",
    },
  },

  // Lista central de servicios
  services: [
    // -------------------------------------------------------------
    // APLICACIONES PÚBLICAS (Cloudflare Tunnel & guacamolegh.es)
    // -------------------------------------------------------------
    {
      id: "hub",
      title: "Hub",
      category: "public",
      description: "Página principal del servidor con acceso rápido y unificado a todos los servicios.",
      url: "https://hub.guacamolegh.es",
      displayUrl: "hub.guacamolegh.es",
      icon: "layout-grid",
      accessType: "public",
      tags: ["hub", "dashboard", "inicio", "servidor", "portal"],
      featured: true,
    },
    {
      id: "master-hub",
      title: "Master-hub",
      category: "public",
      description: "Aplicación web personal centralizada para administración y utilidades.",
      url: "https://master.guacamolegh.es",
      displayUrl: "master.guacamolegh.es",
      icon: "layers",
      accessType: "public",
      tags: ["master", "web", "personal", "gestion", "portal"],
      featured: true,
    },
    {
      id: "coche",
      title: "Gestión del coche",
      category: "public",
      description: "Mantenimiento, repostajes y gastos del vehículo impulsado por LubeLogger.",
      url: "https://coche.guacamolegh.es",
      displayUrl: "coche.guacamolegh.es",
      icon: "car",
      accessType: "public",
      tags: ["coche", "lubelogger", "vehiculo", "mantenimiento", "combustible", "gastos"],
      featured: true,
    },

    // -------------------------------------------------------------
    // SERVICIOS PRIVADOS (Acceso exclusivo por Tailscale VPN)
    // -------------------------------------------------------------
    {
      id: "uptime-kuma",
      title: "Uptime Kuma",
      category: "private",
      description: "Monitorización en tiempo real del estado, latencia y disponibilidad de servicios.",
      // NOTA: Pendiente de ajustar el acceso por Tailscale
      url: "http://servidor-tailscale:3101",
      displayUrl: "tailscale:3101",
      icon: "activity",
      accessType: "tailscale",
      tags: ["uptime", "kuma", "monitor", "ping", "estado", "alertas"],
      featured: false,
    },
    {
      id: "beszel",
      title: "Beszel",
      category: "private",
      description: "Monitorización ligera de recursos de hardware del servidor (CPU, RAM, disco y red).",
      url: "http://servidor-tailscale:8090",
      displayUrl: "tailscale:8090",
      icon: "server-metrics",
      accessType: "tailscale",
      tags: ["beszel", "hardware", "cpu", "ram", "servidor", "metricas"],
      featured: false,
    },
    {
      id: "metube",
      title: "MeTube",
      category: "private",
      description: "Gestor y descargador web de vídeos y listas de reproducción mediante yt-dlp.",
      url: "http://servidor-tailscale:8081",
      displayUrl: "tailscale:8081",
      icon: "download-cloud",
      accessType: "tailscale",
      tags: ["metube", "descargas", "youtube", "videos", "musica", "yt-dlp"],
      featured: false,
    },
    {
      id: "pairdrop",
      title: "PairDrop",
      category: "private",
      description: "Transferencia rápida y cifrada de archivos entre dispositivos en la misma red.",
      url: "http://servidor-tailscale:8787",
      displayUrl: "tailscale:8787",
      icon: "share-2",
      accessType: "tailscale",
      tags: ["pairdrop", "archivos", "transferencia", "airdrop", "p2p", "local"],
      featured: false,
    },
    {
      id: "paperless-ngx",
      title: "Paperless-ngx",
      category: "private",
      description: "Gestión documental digital con indexación, OCR automático y búsqueda inteligente.",
      url: "http://servidor-tailscale:8000",
      displayUrl: "tailscale:8000",
      icon: "file-text",
      accessType: "tailscale",
      tags: ["paperless", "documentos", "facturas", "ocr", "archivo", "gestion"],
      featured: false,
    },
    {
      id: "stirling-pdf",
      title: "Stirling PDF",
      category: "private",
      description: "Suite integral para manipular, unir, dividir, firmar y comprimir archivos PDF.",
      url: "http://servidor-tailscale:8082",
      displayUrl: "tailscale:8082",
      icon: "file-cog",
      accessType: "tailscale",
      tags: ["stirling", "pdf", "convertir", "unir", "comprimir", "herramientas"],
      featured: false,
    },
  ],
};

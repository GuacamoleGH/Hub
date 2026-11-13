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
    version: "v1.2.0",
    repoUrl: "https://github.com/GuacamoleGH/Hub",
    footerText: "Guacamole Server © 2026 — Desplegado con Docker & Nginx",
  },

  // Ajustes de visualización y comportamiento
  ui: {
    defaultTheme: "dark", // "dark" | "light"
    defaultView: "list",  // "list" | "grid"
    defaultCategory: "public", // "public" | "all" | "private"
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
      badge: "Red Privada",
      badgeType: "private",
      icon: "shield",
      description: "Servicios protegidos accesibles exclusivamente desde la red interna (192.168.0.18) o mediante VPN.",
    },
  },

  // Lista central de servicios
  services: [
    // -------------------------------------------------------------
    // APLICACIONES PÚBLICAS (Cloudflare Tunnel & guacamolegh.es)
    // -------------------------------------------------------------
    {
      id: "atlas",
      title: "Atlas",
      category: "public",
      description: "Aplicación web personal centralizada para administración y utilidades.",
      url: "https://atlas.guacamolegh.es",
      displayUrl: "atlas.guacamolegh.es",
      icon: "layers",
      accessType: "public",
      tags: ["atlas", "master", "masterhub", "web", "personal", "gestion", "portal"],
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
    {
      id: "games",
      title: "Games",
      category: "public",
      description: "Catálogo web de 9 juegos arcade clásicos para navegador (Snake, Pong, Tetris, Space Invaders, Pac-Man, Asteroids, etc.).",
      url: "https://games.guacamolegh.es",
      displayUrl: "games.guacamolegh.es",
      icon: "gamepad-2",
      accessType: "public",
      tags: ["games", "juegos", "arcade", "retro", "snake", "tetris", "pong", "pacman", "space-invaders", "asteroids", "blackjack"],
      featured: true,
    },
    {
      id: "flags",
      title: "Flags",
      category: "public",
      description: "Quiz web interactivo bilingüe de banderas de los 196 países oficiales del mundo para el homelab GuacamoleGH.",
      url: "https://flags.guacamolegh.es",
      displayUrl: "flags.guacamolegh.es",
      icon: "flag",
      accessType: "public",
      tags: ["flags", "banderas", "quiz", "juego", "geografia", "paises", "trivia"],
      featured: true,
    },
    {
      id: "metube",
      title: "MeTube",
      category: "public",
      description: "Gestor y descargador web de vídeos y listas de reproducción mediante yt-dlp.",
      url: "https://metube.guacamolegh.es",
      displayUrl: "metube.guacamolegh.es",
      icon: "download-cloud",
      accessType: "public",
      tags: ["metube", "descargas", "youtube", "videos", "musica", "yt-dlp"],
      featured: true,
    },

    {
      id: "share",
      title: "Share",
      category: "public",
      description: "Plataforma segura para transferir y compartir archivos con enlaces protegidos y subidas fragmentadas.",
      url: "https://share.guacamolegh.es",
      displayUrl: "share.guacamolegh.es",
      icon: "share-2",
      accessType: "public",
      tags: ["share", "archivos", "transferencia", "wetransfer", "ficheros", "subidas", "compartir"],
      featured: true,
    },

    // -------------------------------------------------------------
    // SERVICIOS PRIVADOS (Red Privada / DNS local guacamolegh.es)
    // -------------------------------------------------------------
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
      featured: false,
    },
    {
      id: "beszel",
      title: "Beszel",
      category: "private",
      description: "Monitorización ligera de recursos de hardware del servidor (CPU, RAM, disco y red).",
      url: "https://beszel.guacamolegh.es",
      displayUrl: "beszel.guacamolegh.es",
      icon: "server-metrics",
      accessType: "private",
      tags: ["beszel", "hardware", "cpu", "ram", "servidor", "metricas"],
      featured: false,
    },
    {
      id: "stirling-pdf",
      title: "Stirling PDF",
      category: "private",
      description: "Suite integral para manipular, unir, dividir, firmar y comprimir archivos PDF.",
      url: "https://stirling.guacamolegh.es",
      displayUrl: "stirling.guacamolegh.es",
      icon: "file-cog",
      accessType: "private",
      tags: ["stirling", "pdf", "convertir", "unir", "comprimir", "herramientas"],
      featured: false,
    },
  ],
};

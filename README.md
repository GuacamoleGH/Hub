# 🥑 Guacamole Server Hub

Panel de inicio y dashboard de acceso centralizado para aplicaciones y servicios de servidor doméstico. Diseñado con una interfaz moderna, oscura y elegante, de alto rendimiento y 100% estática para desplegarse fácilmente en **Ubuntu** mediante **Docker** y **Nginx**.

![Versión](https://img.shields.io/badge/versión-1.2.0-10b981?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-MIT-06b6d4?style=flat-square)
![Docker](https://img.shields.io/badge/docker-ready-blue?style=flat-square&logo=docker)
![Nginx](https://img.shields.io/badge/nginx-alpine-009639?style=flat-square&logo=nginx)

---

## ✨ Características Principales

- **Diseño Dashboard Premium:** Estética oscura por defecto inspirada en dashboards modernos de alta gama (con paleta de obsidian y pizarra), además de selector de modo claro persistente.
- **Doble Modo de Vista (Cuadrícula / Lista):** Selector interactivo y persistente para alternar entre vista de tarjetas visuales o filas compactas (atajo tecla `V`).
- **Buscador en Tiempo Real:** Filtra instantáneamente por nombre de servicio, descripción, etiquetas o URLs.
- **Categorización Visual Clara:**
  - 🌐 **Aplicaciones Públicas:** Accesibles vía Cloudflare Tunnel bajo el dominio `guacamolegh.es`.
  - 🔒 **Servicios Privados:** Protegidos y accesibles únicamente dentro de la red privada con **Tailscale VPN** o DNS local.
- **Categoría por Defecto Inteligente:** Acceso inmediato a la pestaña de aplicaciones públicas (`defaultCategory: 'public'`).
- **Zero Dependencias Externas:** Iconos vectoriales SVG limpios e integrados (sin fuentes ni CDNs externos como FontAwesome o Google Fonts). Funciona perfectamente en entornos aislados o sin conexión a internet.
- **Accesibilidad & UX:** Totalmente navegable por teclado, estados de foco visibles y atajos integrados (`/` o `Ctrl + K` para buscar, `Esc` para limpiar, `T` para alternar tema y `?` para ver atajos).
- **Reloj y Fecha en Vivo:** Barra superior con indicador en tiempo real y tipografía monoespaciada para administración de sistemas.
- **Configuración Centralizada:** Todas las aplicaciones, URLs y categorías se configuran en un único archivo (`assets/js/config.js`).
- **Despliegue Ultraligero:** Imagen Docker basada en `nginx:alpine` (~25 MB) con compresión Gzip, cabeceras de seguridad y comprobación de salud nativa (`/health`).

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
├── docker/
│   └── nginx.conf               # Configuración optimizada de Nginx (gzip, seguridad, sin caché para config)
├── .dockerignore
├── .gitignore
├── docker-compose.yml           # Archivo de orquestación de Docker Compose
├── Dockerfile                   # Construcción de la imagen basada en Nginx Alpine
├── index.html                   # Documento HTML principal
└── README.md                    # Documentación completa del proyecto
```

---

## 🛠️ Servicios Preconfigurados

### 1. Aplicaciones Públicas (`guacamolegh.es` vía Cloudflare Tunnel)
| Servicio | Subdominio | Descripción |
| :--- | :--- | :--- |
| **Atlas** | `https://atlas.guacamolegh.es` | Aplicación web personal |
| **Gestión del coche** | `https://coche.guacamolegh.es` | Mantenimiento, repostajes y gastos con LubeLogger |
| **Games** | `https://games.guacamolegh.es` | Catálogo de juegos arcade clásicos para navegador |
| **Flags** | `https://flags.guacamolegh.es` | Quiz web interactivo bilingüe de banderas de los 196 países oficiales del mundo para el homelab GuacamoleGH |

### 2. Servicios Privados (Red Local / DNS Privado guacamolegh.es)
| Servicio | Dominio Privado | Descripción |
| :--- | :--- | :--- |
| **Uptime Kuma** | `https://uptime.guacamolegh.es` | Monitorización de estado y latencia |
| **Beszel** | `https://beszel.guacamolegh.es` | Monitorización ligera de CPU, RAM, disco y red |
| **MeTube** | `https://metube.guacamolegh.es` | Interfaz web de descarga de vídeos vía yt-dlp |
| **Stirling PDF** | `https://stirling.guacamolegh.es` | Herramientas integrales para manipulación de PDFs |

---

## ⚙️ Configuración y Personalización

El archivo [`assets/js/config.js`](assets/js/config.js) contiene toda la información de las aplicaciones.

### Resolución de DNS Local (192.168.0.18)
Los servicios privados resuelven en tu red interna (por ejemplo mediante Pi-hole, AdGuard Home o `/etc/hosts` apuntando a `192.168.0.18`):

```text
192.168.0.18 beszel.guacamolegh.es
192.168.0.18 metube.guacamolegh.es
192.168.0.18 stirling.guacamolegh.es
192.168.0.18 uptime.guacamolegh.es
```

En el Hub, cada tarjeta apunta directamente a su subdominio sin exponer ni requerir escribir la dirección IP:

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
  description: "Servidor multimedia para streaming de películas, series y música.",
  url: "https://jellyfin.guacamolegh.es",
  displayUrl: "jellyfin.guacamolegh.es",
  icon: "tv", // Nombre del icono definido en icons.js
  accessType: "private",
  tags: ["media", "streaming", "peliculas", "jellyfin"],
  featured: false
}
```

---

## 💻 Ejecución en Entorno Local (Desarrollo)

Como es una aplicación puramente estática (HTML, CSS y JS estándar), no requiere instalación de dependencias ni compilación (`npm build`).

### Opción 1: Abrir directamente
Haz doble clic en el archivo `index.html` de la carpeta del proyecto.

### Opción 2: Con servidor HTTP local (Python)
```bash
# Python 3
python -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080`.

### Opción 3: Con Node / npx
```bash
npx serve -l 8080 .
```

---

## 🚀 Despliegue en Servidor Ubuntu con Docker y Nginx

### Paso 1: Clonar el repositorio en tu servidor Ubuntu
Conéctate por SSH a tu servidor y clona el proyecto:

```bash
cd ~/servicios # o el directorio donde guardes tus contenedores
git clone https://github.com/GuacamoleGH/Hub.git
cd Hub
```

### Paso 2: Ajustar URLs en `config.js`
Edita la configuración con tu editor preferido:

```bash
nano assets/js/config.js
```
Guarda los cambios con `Ctrl + O` y sal con `Ctrl + X`.

### Paso 3: Iniciar el contenedor con Docker Compose
Ejecuta el servicio en segundo plano:

```bash
docker compose up -d --build
```

El hub estará activo y escuchando en el puerto `8080` de tu servidor. Puedes verificar su estado con:

```bash
docker compose ps
docker compose logs -f
```

> **Nota sobre el volumen montado:** `docker-compose.yml` tiene mapeado el archivo `./assets/js/config.js` en modo solo lectura (`:ro`). Si más adelante cambias una URL o añades un servicio en tu servidor, **no necesitas reconstruir el contenedor**: basta con refrescar el navegador gracias a la regla de no-caché configurada en Nginx.

---

## 🌐 Configuración con Cloudflare Tunnel

Para publicar el Hub en `https://hub.guacamolegh.es`:

1. Accede a tu panel de **Cloudflare Zero Trust** > **Networks** > **Tunnels**.
2. Selecciona tu túnel activo y dirígete a la pestaña **Public Hostnames**.
3. Haz clic en **Add a public hostname** y añade:
   - **Subdomain:** `hub`
   - **Domain:** `guacamolegh.es`
   - **Type:** `HTTP`
   - **URL:** `localhost:8080` (o la IP interna de tu máquina / nombre de red Docker).
4. Guarda los cambios. En unos segundos tu Hub estará disponible bajo HTTPS con certificado SSL automático y protección DDoS.

> 🔒 **Recuerda:** Tus servicios privados (`Uptime Kuma`, `Beszel`, `MeTube`, etc.) **no** deben añadirse a Cloudflare Tunnel. Solo debes acceder a ellos mediante red local o VPN.

---

## 🔄 Actualización Continua desde GitHub (`git pull`)

Cuando hagas cambios desde tu equipo y los subas a GitHub, actualiza el servidor con un comando:

```bash
cd ~/servicios/Hub
git pull origin main
```

Si modificaste únicamente `config.js` o estilos estáticos, los cambios se reflejarán instantáneamente en tu navegador. Si hiciste cambios en `Dockerfile` o `nginx.conf`, reconstruye el contenedor:

```bash
docker compose up -d --build
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

Este proyecto está bajo la Licencia MIT. Siéntete libre de modificarlo y adaptarlo a tu propia infraestructura doméstica.

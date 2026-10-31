# 🥑 Guacamole Server Hub

Panel de inicio y dashboard de acceso centralizado para aplicaciones y servicios de servidor doméstico. Diseñado con una interfaz moderna, oscura y elegante, de alto rendimiento y 100% estática para desplegarse fácilmente en **Ubuntu** mediante **Docker** y **Nginx**.

![Versión](https://img.shields.io/badge/versión-1.0.0-10b981?style=flat-square)
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
  - 🔒 **Servicios Privados:** Protegidos y accesibles únicamente dentro de la red privada con **Tailscale VPN**.
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
| **Hub** | `https://hub.guacamolegh.es` | Portal de inicio y acceso centralizado |
| **Master-hub** | `https://master.guacamolegh.es` | Aplicación web personal |
| **Gestión del coche** | `https://coche.guacamolegh.es` | Mantenimiento, repostajes y gastos con LubeLogger |

### 2. Servicios Privados (Tailscale Mesh VPN)
| Servicio | URL Placeholder | Descripción |
| :--- | :--- | :--- |
| **Uptime Kuma** | `http://servidor-tailscale:3101` | Monitorización de estado y latencia (puerto 3101 - pendiente de ajustar acceso) |
| **Beszel** | `http://servidor-tailscale:8090` | Monitorización ligera de CPU, RAM, disco y red (puerto 8090) |
| **MeTube** | `http://servidor-tailscale:8081` | Interfaz web de descarga de vídeos vía yt-dlp (puerto 8081) |
| **PairDrop** | `http://servidor-tailscale:8787` | Transferencia local cifrada estilo AirDrop (puerto 8787) |
| **Paperless-ngx** | `http://servidor-tailscale:8000` | Gestión documental con OCR automático (puerto 8000) |
| **Stirling PDF** | `http://servidor-tailscale:8082` | Herramientas integrales para manipulación de PDFs (puerto 8082) |

---

## ⚙️ Configuración y Personalización

El archivo [`assets/js/config.js`](assets/js/config.js) contiene toda la información de las aplicaciones.

### Ejemplo: Cómo adaptar las URLs de Tailscale

Por defecto, los servicios privados usan placeholders como `http://servidor-tailscale:3101`. Puedes cambiarlos a tu configuración real de Tailscale de tres maneras:

#### Opción A: Mediante MagicDNS de Tailscale (Recomendada)
Si tu servidor Ubuntu se llama en Tailscale `ubuntu-server` o `homeserver`:

```javascript
{
  id: "uptime-kuma",
  title: "Uptime Kuma",
  category: "private",
  description: "Monitorización en tiempo real del estado, latencia y disponibilidad de servicios.",
  url: "http://ubuntu-server:3101",           // <-- URL real con MagicDNS
  displayUrl: "ubuntu-server:3101",           // <-- Texto mostrado en la tarjeta
  icon: "activity",
  accessType: "tailscale",
  tags: ["uptime", "kuma", "monitor", "ping", "estado", "alertas"],
  featured: false
}
```

#### Opción B: Mediante la IP Privada de Tailscale (Rango 100.x.y.z)
```javascript
url: "http://100.85.120.45:3101",
displayUrl: "100.85.120.45:3101",
```

#### Opción C: Mediante subdominios locales con HTTPS interno
```javascript
url: "https://uptime.homeserver.ts.net",
displayUrl: "uptime.homeserver.ts.net",
```

### Cómo añadir un nuevo servicio
Simplemente añade un objeto al array `services` en [`assets/js/config.js`](assets/js/config.js):

```javascript
{
  id: "jellyfin",
  title: "Jellyfin",
  category: "private", // "public" | "private" | "automations"
  description: "Servidor multimedia para streaming de películas, series y música.",
  url: "http://ubuntu-server:8096",
  displayUrl: "ubuntu-server:8096",
  icon: "tv", // Nombre del icono definido en icons.js
  accessType: "tailscale", // "public" | "tailscale"
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

> 🔒 **Recuerda:** Tus servicios privados (`Uptime Kuma`, `Beszel`, `MeTube`, etc.) **no** deben añadirse a Cloudflare Tunnel. Solo debes acceder a ellos mediante la VPN de Tailscale.

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

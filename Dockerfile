# Imagen ligera de Nginx sobre Alpine Linux
FROM nginx:1.27-alpine

# Metadatos del contenedor
LABEL maintainer="GuacamoleGH"
LABEL description="Guacamole Server Hub - Dashboard estático de inicio para servicios personales"

# Eliminar configuración por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copiar configuración personalizada y optimizada de Nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos estáticos de la aplicación
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Asegurar permisos de lectura para el usuario estándar de Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exponer el puerto web 80
EXPOSE 80

# Comprobación de salud nativa de Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/health || exit 1

# Comando de ejecución por defecto
CMD ["nginx", "-g", "daemon off;"]

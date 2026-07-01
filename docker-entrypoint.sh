#!/bin/bash
set -e

# Crear symlink de storage si no existe o está roto
if [ ! -L /var/www/html/public/storage ] || [ ! -e /var/www/html/public/storage ]; then
    php artisan storage:link
fi

# Asegurar permisos correctos (por si el bind mount los resetea)
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Ejecutar el comando original del contenedor (arrancar Apache)
exec "$@"

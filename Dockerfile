# ─── Stage 1: Node build (Vite + React) ─────────────────────────────────────
FROM node:20-alpine AS node_builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build


# ─── Stage 2: PHP application ────────────────────────────────────────────────
FROM php:8.2-fpm-alpine

# ── System dependencies ──────────────────────────────────────────────────────
RUN apk add --no-cache \
    bash \
    curl \
    git \
    unzip \
    zip \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    supervisor \
    # Para spatie/laravel-medialibrary (optimización de imágenes)
    jpegoptim \
    optipng \
    pngquant \
    gifsicle \
    # Para barryvdh/laravel-dompdf
    fontconfig \
    ttf-freefont

# ── Extensiones PHP ──────────────────────────────────────────────────────────
RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        opcache \
        pdo \
        pdo_mysql \
        pcntl \
        zip

# ── Composer ─────────────────────────────────────────────────────────────────
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ── Directorio de trabajo ─────────────────────────────────────────────────────
WORKDIR /var/www/html

# ── Dependencias PHP (solo producción) ───────────────────────────────────────
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --optimize-autoloader

# ── Código fuente ─────────────────────────────────────────────────────────────
COPY . .

# ── Assets compilados desde el stage Node ────────────────────────────────────
COPY --from=node_builder /app/public/build ./public/build

# ── Autoloader final + optimizaciones Laravel ────────────────────────────────
RUN composer dump-autoload --optimize \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

# ── Permisos ─────────────────────────────────────────────────────────────────
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# ── Supervisor: PHP-FPM + Queue Worker + Reverb ──────────────────────────────
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ── PHP-FPM config (escuchar en socket TCP para Nginx externo) ───────────────
RUN sed -i 's|listen = 127.0.0.1:9000|listen = 9000|g' \
    /usr/local/etc/php-fpm.d/www.conf

EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

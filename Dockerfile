# Stage 1: Билд фронтенда React
FROM node:14 as frontend

WORKDIR /app

COPY code/frontend/package.json code/frontend/package-lock.json ./
RUN npm ci --silent
COPY code/frontend/public ./public
COPY code/frontend/src ./src
RUN npm run build

# Stage 2: Установка зависимостей PHP и Nginx
FROM php:7.4-fpm as backend

RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# COPY backend/composer.json backend/composer.lock ./
# RUN composer install --no-scripts --no-autoloader

COPY code/backend ./
# RUN composer dump-autoload --optimize

# Stage 3: Итоговый контейнер с фронтендом, бэкендом и Nginx
FROM nginx:1.21

COPY --from=frontend /app/build /var/www/html
COPY --from=backend /var/www/html /var/www/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
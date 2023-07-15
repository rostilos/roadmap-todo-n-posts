# Stage 1: Билд фронтенда React
FROM node:14 as frontend

WORKDIR /app

COPY ./code/package.json package-lock.json ./
RUN npm ci --silent
COPY ./code/public ./public
COPY ./code/src ./src
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


# Stage 3: Итоговый контейнер 
FROM nginx:1.21

COPY --from=frontend /app/build /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
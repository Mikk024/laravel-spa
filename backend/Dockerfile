FROM php:8.1-apache

ARG user
ARG uid

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update && apt-get -y install nodejs 

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

WORKDIR /var/www/html
COPY . .


RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "upload_max_filesize = 30M;" >> /usr/local/etc/php/conf.d/uploads.ini


RUN composer install
RUN npm install
CMD php artisan migrate --force && php artisan storage:link && php artisan serve --host=0.0.0.0 --port=$PORT
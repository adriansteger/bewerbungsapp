# Use the official PHP image with Apache
FROM php:8.0-apache

# Install system dependencies (e.g., for Composer or any PHP extensions you might need)
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip

# Install Composer from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy composer files first to leverage Docker cache
COPY composer.json composer.lock* /var/www/html/

# Install PHP dependencies via Composer
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of your PHP code into the container
COPY . /var/www/html

# Ensure .env is included
COPY .env /var/www/html/

# Expose port 80 (Apache default)
EXPOSE 80

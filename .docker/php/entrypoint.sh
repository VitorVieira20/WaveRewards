#!/bin/bash

if [ ! -d "vendor" ]; then
    echo "📦 A instalar dependências do Composer..."
    composer install --no-progress --no-interaction
fi

if [ ! -d "node_modules" ]; then
    echo "📦 A instalar dependências do NPM..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "📄 A criar ficheiro .env..."
    cp .env.example .env
    php artisan key:generate
fi

echo "⏳ À espera que a Base de Dados arranque..."
while ! nc -z db 3306; do
  sleep 1
done
echo "✅ Base de Dados conectada!"

if [ ! -f ".setup_done" ]; then
    echo "🚀 A correr migrações e seed pela primeira vez..."

    php artisan migrate:fresh --seed --force || echo "⚠️ Aviso: Houve um erro na migração inicial, verifique os logs."

    if [ -d "public/storage" ] || [ -L "public/storage" ]; then
        rm -rf public/storage
    fi
    php artisan storage:link

    touch .setup_done
else
    echo "🔄 A correr apenas migrações pendentes..."
    php artisan migrate --force
fi

echo "🏁 Arranque concluído. A iniciar PHP-FPM..."
exec "$@"
#!/bin/sh

# Aguarda o banco ficar disponível
until nc -z db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

npm run db:generate
npm run db:migrate
npm run start
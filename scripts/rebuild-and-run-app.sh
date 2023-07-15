#!/bin/bash

# Остановка и удаление контейнеров, если они уже запущены
docker stop app
docker rm app
docker stop db
docker rm db
docker stop webserver
docker rm webserver
docker stop frontend_frontend_1
docker rm frontend_frontend_1

# Остановка локальных сервисов
sudo service nginx stop
sudo service mysql stop

# Запуск контейнеров
cd ../app/backend/
docker-compose build 
docker-compose -f docker-compose.yml up -d

cd ../frontend/
docker-compose build
docker-compose -f docker-compose.yml up -d
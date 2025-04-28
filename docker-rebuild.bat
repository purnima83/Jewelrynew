@echo off
echo =========================================
echo Stopping running containers...
docker-compose down

echo =========================================
echo Building containers...
docker-compose build

echo =========================================
echo Starting containers...
docker-compose up -d

echo =========================================
echo All services started successfully!
pause

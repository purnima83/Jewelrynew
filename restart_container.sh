#!/bin/bash

# Stop the containers
echo "Stopping containers..."
docker-compose down

# Build the containers
echo "Building containers..."
docker-compose build

# Start the containers
echo "Starting containers..."
docker-compose up -d

echo "All services started."
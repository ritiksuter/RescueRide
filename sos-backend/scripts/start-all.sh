#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCKER_DIR="$ROOT_DIR/docker"

echo " Starting all services with Docker Compose..."

cd "$DOCKER_DIR"

docker compose up -d --build

echo ""
echo " All services are starting in background (detached mode)."
echo ""

echo "API Gateway:              http://localhost:8000"
echo "Auth Service:             http://localhost:8001/health"
echo "User Service:             http://localhost:8002/health"
echo "Mechanic Service:         http://localhost:8003/health"
echo "SOS Service:              http://localhost:8004/health"
echo "Tracking Service:         http://localhost:8005/health"
echo "Admin Service:            http://localhost:8006/health"
echo "Notification Service:     ws://localhost:9007"

echo ""
echo "AI Chat Service:          http://localhost:8010/health"
echo "PDF Ingestion Service:    http://localhost:8011/health"

echo ""
echo "MongoDB:                  mongodb://localhost:27017"
echo "Redis:                    redis://localhost:6379"

echo ""
echo "🚀 SOS Vehicle Backend + AI System started successfully."
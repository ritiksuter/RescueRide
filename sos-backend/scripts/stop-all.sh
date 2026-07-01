#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCKER_DIR="$ROOT_DIR/docker"

echo "🛑 Stopping SOS Vehicle Backend + AI System..."

cd "$DOCKER_DIR"

# Stop and remove all containers
docker compose down

echo ""
echo "✅ All services stopped successfully."
echo "✅ Containers removed."
echo ""

echo "Stopped Services:"
echo "• API Gateway"
echo "• Auth Service"
echo "• User Service"
echo "• Mechanic Service"
echo "• SOS Service"
echo "• Tracking Service"
echo "• Admin Service"
echo "• Notification Service"
echo "• AI Chat Service"
echo "• PDF Ingestion Service"
echo "• MongoDB"
echo "• Redis"

echo ""
echo "ℹ️ Volumes are preserved by default."
echo "ℹ️ MongoDB and Redis data still exist."

echo ""
echo "For full cleanup including volumes:"
echo "docker compose down -v"
echo ""
echo "🧹 System shutdown complete."
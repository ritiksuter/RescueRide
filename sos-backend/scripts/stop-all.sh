#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCKER_DIR="$ROOT_DIR/docker"

echo "🛑 Stopping all services..."
cd "$DOCKER_DIR"

docker compose down

echo "✅ All services stopped and containers removed."

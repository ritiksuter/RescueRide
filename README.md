# SOS Vehicle 🚨

**SOS Vehicle** is a microservices-based emergency roadside assistance platform. This repository contains the backend (multiple Node.js microservices) and the frontend (React + Vite) plus Docker configurations to run the full stack locally or in containers.

---

## 📋 Table of Contents

- [Project overview](#project-overview)
- [Architecture & services](#architecture--services)
- [Quick start (Docker)](#quick-start-docker)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Testing](#testing)
- [Project structure](#project-structure)
- [Troubleshooting & notes](#troubleshooting--notes)
- [Contributing](#contributing)
- [License](#license)

---

## 🏗️ Project overview

This monorepo contains two main folders:

- `sos-backend/` — Node.js microservices (API Gateway, Auth, User, Mechanic, SOS, Tracking, Notification, Admin). Uses Express, MongoDB, Redis (pub/sub + cache), Socket.IO for realtime notifications, and Docker for containerized development.
- `sos-frontend/` — React + Vite SPA for user, mechanic, and admin interfaces. Uses Leaflet for maps, Socket.IO client for realtime updates, TailwindCSS for styling.

---

## 🔧 Architecture & services

High-level services and default ports (development / Docker):

- **API Gateway** — 8000
- **Auth Service** — 8001
- **User Service** — 8002
- **Mechanic Service** — 8003
- **SOS Service** — 8004
- **Tracking Service** — 8005
- **Admin Service** — 8006
- **Notification (Socket.IO)** — 9007
- **Frontend (Vite)** — 5173 (dev) / 3000 (Docker example)

Services communicate via REST through the API Gateway and via Redis Pub/Sub for asynchronous events.

---

## 🚀 Quick start (Docker)

Recommended: use the included scripts to start the backend services and dependencies.

1. Start backend services (MongoDB, Redis, microservices):

```bash
cd sos-backend
# start-all.sh spins up DB, Redis and all services via docker-compose
./scripts/start-all.sh
```

2. Start the frontend (option A: Docker):

```bash
cd sos-frontend
# build and run container
docker build -t sos-frontend:latest .
docker run -p 3000:80 sos-frontend:latest
```

Option B (dev):

```bash
cd sos-frontend
npm install
npm run dev
# frontend opens at http://localhost:5173
```

3. Verify health endpoints (examples):

```bash
curl http://localhost:8000/      # API gateway
curl http://localhost:8001/health
curl http://localhost:8002/health
# ... etc
```

> ⚠️ If you use Docker Compose from a different folder, check `sos-backend/docker/docker-compose.yml` and `sos-frontend/docker-compose.yml` for service mappings and ports.

---

## 🛠️ Local development

- Backend: each service is a small Node.js project. Example to run the Auth service locally:

```bash
cd sos-backend/auth-service
npm install
npm run dev
```

- Frontend:

```bash
cd sos-frontend
npm install
npm run dev
```

- Running services individually is useful for debugging; keep MongoDB and Redis running (via Docker) or point to remote instances.

---

## ⚙️ Environment variables

Each service has its own `.env` file and variables. Some common environment variables:

```
NODE_ENV=development|production|test
PORT=<service-port>
MONGODB_URI=mongodb://localhost:27017/sos-vehicle
REDIS_HOST=localhost
REDIS_PORT=6379
```

Frontend uses Vite variables (example `.env`):

```
VITE_API_BASE_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:9007
VITE_MAP_DEFAULT_LAT=12.9716
VITE_MAP_DEFAULT_LNG=77.5946
VITE_MAP_DEFAULT_ZOOM=13
```

Check the service-specific README files in `sos-backend/*-service/` and `sos-frontend/README.md` for the full list of environment variables.

---

## ✅ Testing

- Backend services use Jest & Supertest. Run tests from a service folder:

```bash
cd sos-backend/auth-service
npm test
```

- Frontend: add unit tests where needed (Jest/React Testing Library if included) and run:

```bash
cd sos-frontend
npm test
```

---

## 📁 Project structure (summary)

```
/ (repo root)
├─ sos-backend/       # Node.js microservices + scripts + docker configs
│  ├─ auth-service/
│  ├─ user-service/
│  ├─ mechanic-service/
│  ├─ sos-service/
│  ├─ tracking-service/
│  ├─ admin-service/
│  ├─ notification-service/
│  ├─ api-gateway/
│  └─ docker/        # docker-compose.yml, Dockerfiles
├─ sos-frontend/      # React + Vite app
└─ README.md          # This file
```

---

## 🔍 Troubleshooting & tips

- If services cannot connect to Mongo/Redis in Docker: ensure containers are healthy and ports match `.env` values.
- To view logs of all containers:

```bash
docker compose -f sos-backend/docker/docker-compose.yml logs -f
```

- For realtime issues (Socket.IO), make sure `notification-service` is running and `VITE_SOCKET_URL` points to the socket endpoint.

---

## 🤝 Contributing

- Please follow the contribution guidelines in individual service READMEs where provided.
- Open issues and PRs with clear descriptions and steps to reproduce.
- Consider adding tests when changing logic or adding features.

---

## 📜 License

Add a LICENSE file at the repo root (e.g., MIT) if you plan to publish this repository.

---

If you'd like, I can also:

- Clean up and standardize each service README for consistency ✅
- Add `DEVELOPMENT.md` or `CONTRIBUTING.md` with more detailed workflows 📄

Tell me which of these you'd like next.
# SOS Vehicle Backend

A microservices-based backend system for an emergency roadside assistance platform. This system provides SOS services, user management, mechanic coordination, real-time tracking, notifications, and admin capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database & Caching](#database--caching)
- [Event-Driven Architecture](#event-driven-architecture)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🏗️ Overview

SOS Vehicle Backend is a comprehensive microservices platform built with Node.js and Express.js that handles emergency vehicle assistance requests. The system enables users to request help, connects them with nearby mechanics, provides real-time tracking, and maintains admin oversight.

### Key Features

- **User Management**: Registration, authentication, and profile management
- **Emergency Services**: SOS request creation and management
- **Mechanic Network**: Mechanic registration and service request matching
- **Real-time Tracking**: Live location tracking during assistance
- **Notifications**: WebSocket-based real-time notifications
- **Admin Dashboard**: Administrative oversight and statistics
- **Event-Driven Communication**: Decoupled services via Redis pub/sub

## 🎯 Architecture

```
┌─────────────────────────────────────┐
│        API Gateway (Port 8000)      │
└──────────────┬──────────────────────┘
               │
     ┌─────────┼─────────┐
     │         │         │
┌────▼──┐ ┌───▼──┐ ┌────▼───┐
│ Auth  │ │User  │ │Mechanic│  ... Other Services
│8001   │ │8002  │ │8003    │
└────┬──┘ └───┬──┘ └────┬───┘
     │        │         │
     └────────┼─────────┘
              │
    ┌─────────┴──────────┐
    │                    │
  ┌─▼──┐            ┌────▼───┐
  │Mongo│           │ Redis  │
  │ DB  │           │Cache   │
  └─────┘           └────────┘
```

## 🔧 Services

### 1. **API Gateway** (Port 8000)

- Central entry point for all client requests
- Request routing and proxying
- Rate limiting and authentication middleware 

### 2. **Auth Service** (Port 8001)

- User authentication and authorization
- JWT token generation and validation
- Login, registration, and token refresh

### 3. **User Service** (Port 8002)

- User profile management
- User information retrieval and updates
- Personal data management

### 4. **Mechanic Service** (Port 8003)

- Mechanic profile management
- Service availability management
- Location and skill information

### 5. **SOS Service** (Port 8004)

- Emergency request creation and management
- Request status tracking
- Mechanic assignment and routing
- Request history

### 6. **Tracking Service** (Port 8005)

- Real-time location tracking
- Route history management
- Geolocation-based services

### 7. **PDF Ingestion Service** (Port 8010)

- Document upload and PDF processing
- Text extraction, chunking, and embeddings
- Pinecone-ready knowledge base ingestion
- Redis queue-backed worker pipeline

### 8. **AI Chat Service** (Configurable port via `.env`)

- Retrieval-augmented generation (RAG) chat interface
- Pinecone-based knowledge retrieval
- OpenAI conversation generation
- JWT-protected chat endpoints and history storage

### 9. **Admin Service** (Port 8006)

- Administrative operations
- User and mechanic moderation
- Statistics and analytics
- System health monitoring

### 10. **Notification Service** (Port 9007)

- WebSocket server for real-time notifications
- Event-based alerts
- Socket.io integration

## 💻 Technology Stack

| Component                   | Technology             |
| --------------------------- | ---------------------- |
| **Runtime**                 | Node.js                |
| **Framework**               | Express.js             |
| **Database**                | MongoDB                |
| **Cache**                   | Redis                  |
| **Real-time Communication** | Socket.io (WebSocket)  |
| **Event Streaming**         | Redis Pub/Sub          |
| **Testing**                 | Jest, Supertest        |
| **Development**             | Nodemon                |
| **Containerization**        | Docker, Docker Compose |
| **HTTP Client**             | Axios                  |
| **Logging**                 | Morgan                 |
| **CORS**                    | cors                   |
| **Environment**             | dotenv                 |

## 📦 Prerequisites

- **Node.js** >= 14.x
- **npm** >= 6.x or **yarn** >= 1.22.x
- **Docker** >= 20.x (for containerized setup)
- **Docker Compose** >= 1.29.x

## 🚀 Installation & Setup

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sos-backend
   ```

2. **Set up environment files**
   Each service has a `.env` file. Ensure all required variables are configured:

   ```bash
   # Check each service folder for .env file
   ls *-service/.env
   ```

3. **Start all services**

   ```bash
   ./scripts/start-all.sh
   ```

   This will:
   - Start MongoDB container
   - Start Redis container
   - Build and start all microservices
   - Establish inter-service networking

### Option 2: Manual Installation (Local Development)

1. **Install dependencies for each service**

   ```bash
   # Auth Service
   cd auth-service
   npm install

   # User Service
   cd ../user-service
   npm install

   # Repeat for other services...
   ```

2. **Configure environment variables**
   Create `.env` files in each service directory with required variables.

3. **Start MongoDB and Redis**

   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name sos-mongo mongo:6
   docker run -d -p 6379:6379 --name sos-redis redis:7
   ```

4. **Start each service individually**
   ```bash
   cd auth-service && npm run dev
   # In another terminal
   cd user-service && npm run dev
   # And so on...
   ```

## 📱 Running the Application

### Using Docker Compose

```bash
# Start all services in detached mode
./scripts/start-all.sh

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop all services
./scripts/stop-all.sh

# Rebuild and start
docker compose -f docker/docker-compose.yml up -d --build
```

### Individual Service Development

```bash
# Start a specific service in development mode
cd <service-name>
npm run dev

# Run tests
npm test

# Start for production
npm start
```

## 📂 Project Structure

```
sos-backend/
├── admin-service/              # Administrative operations
│   ├── src/
│   │   ├── app.js             # Express app initialization
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── events/            # Event publishers/subscribers
│   │   ├── repositories/      # Database access layer
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   └── utils/             # Utility functions
│   └── tests/                 # Test suite
├── auth-service/              # Authentication & Authorization
├── ai-chat-service/           # AI-powered conversational RAG service
├── pdf-ingestion-service/     # PDF upload, extraction, chunking, and embedding
├── user-service/              # User Management
├── mechanic-service/          # Mechanic Management
├── sos-service/               # Emergency Services
├── tracking-service/          # Real-time Tracking
├── notification-service/      # Notifications & WebSocket
├── api-gateway/               # Request Routing & Proxying
├── shared/                    # Shared utilities & middleware
│   ├── constants/            # Shared constants
│   ├── dto/                  # Data Transfer Objects
│   ├── logger/               # Logging utilities
│   ├── middlewares/          # Shared middlewares
│   └── utils/                # Utility functions
├── docker/                   # Docker configurations
│   └── docker-compose.yml   # Multi-container orchestration
├── scripts/                  # Startup/shutdown scripts
├── tests/                    # Root-level tests and integration examples
└── README.md                # This file
```

## 📚 API Documentation

### Health Checks

Each service exposes a health endpoint:

```bash
# Auth Service
curl http://localhost:8001/health

# User Service
curl http://localhost:8002/health

# Mechanic Service
curl http://localhost:8003/health

# SOS Service
curl http://localhost:8004/health

# Tracking Service
curl http://localhost:8005/health

# PDF Ingestion Service
curl http://localhost:8010/health

# AI Chat Service
curl http://localhost:8010/health

> Note: `pdf-ingestion-service` and `ai-chat-service` both default to port `8010`. Set unique `PORT` values in the respective `.env` files when running both services locally.

# Admin Service
curl http://localhost:8006/health

# Notification Service
curl http://localhost:9007/health

# API Gateway
curl http://localhost:8000
```

### Service Endpoints

All requests should go through the API Gateway (port 8000). Each service can also be accessed directly for development purposes.

Example service endpoints:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/users/:id` - Get user profile
- `POST /api/sos/request` - Create SOS request
- `GET /api/sos/request/:id` - Get SOS request details
- `POST /api/mechanics/register` - Register mechanic
- `GET /api/tracking/:id` - Get tracking info
- `GET /api/admin/statistics` - Get statistics
- `POST /api/ai/chat/ask` - Ask the AI chat service a question
- `GET /api/ai/chat/history/:sessionId` - Retrieve chat history for a session
- `POST /api/documents/upload` - Upload a PDF document for ingestion
- `GET /api/documents/:documentId` - View uploaded document metadata and status

For detailed API documentation, refer to individual service documentation or Postman collections.

## 🔐 Environment Variables

### Common Variables (All Services)

```
NODE_ENV=development|production|test
PORT=<service-port>
MONGODB_URI=mongodb://localhost:27017/sos-vehicle
REDIS_HOST=localhost
REDIS_PORT=6379
LOG_LEVEL=debug|info|warn|error
```

### Service-Specific Variables

**Auth Service**

```
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d
```

**API Gateway**

```
API_GATEWAY_PORT=8000
API_TIMEOUT=30000
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

Check individual `.env` files in each service directory for complete configuration options.

## 💾 Database & Caching

### MongoDB

- **Data Store**: Primary database for all persistent data
- **Connection**: `mongodb://mongo:27017/sos-vehicle` (Docker)
- **Features**:
  - User profiles
  - SOS requests
  - Mechanic information
  - Tracking history
  - Admin logs

### Redis

- **Cache Layer**: Session caching and data acceleration
- **Pub/Sub**: Event-driven inter-service communication
- **Connection**: `redis://redis:6379` (Docker)
- **Use Cases**:
  - Session management
  - Request throttling
  - Event publishing/subscribing

## 🔄 Event-Driven Architecture

Services communicate asynchronously using Redis Pub/Sub:

### Event Flow

````
# SOS Vehicle Backend

A microservices monorepo that implements an emergency roadside assistance backend. It contains services for authentication, user and mechanic management, SOS requests, real-time tracking, notifications (WebSocket), and an admin service with analytics.

---

## 📋 Table of contents

1. [Repository overview](#repository-overview)
2. [Services](#services)
3. [Technology stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Quick start (Docker)](#quick-start-docker)
6. [Local development](#local-development)
7. [Environment variables](#environment-variables)
8. [Testing](#testing)
9. [Deployment & Docker](#deployment--docker)
10. [Contributing](#contributing)

---

## 📁 Repository overview

Top-level structure (major folders):

- `api-gateway/` — gateway & routing
- `auth-service/` — authentication & tokens
- `user-service/` — user profiles and data
- `mechanic-service/` — mechanic profiles & availability
- `sos-service/` — SOS request lifecycle and assignments
- `tracking-service/` — real-time tracking and location history
- `notification-service/` — Socket.io notifications
- `admin-service/` — admin operations and stats
- `docker/` — Dockerfiles and `docker-compose.yml`
- `scripts/` — helper scripts (start/stop/seed)

Each service is a standalone Node.js/Express app located in its own folder with `src/`, `tests/`, and a `Dockerfile`.

---

## 🧩 Services

Below are the services and their responsibilities:

- **API Gateway** (port 8000) — request routing, auth middleware, rate limiting
- **Auth Service** (port 8001) — login / register, JWT issuance
- **User Service** (port 8002) — user profiles & management
- **Mechanic Service** (port 8003) — mechanic profiles, statuses, locations
- **SOS Service** (port 8004) — create/assign SOS requests
- **Tracking Service** (port 8005) — location ingestion & sessions
- **Admin Service** (port 8006) — moderation, system stats
- **Notification Service** (port 9007) — WebSocket notifications via Socket.io

Refer to each service's `src/` folder for detailed controllers, services, events, and routes.

---

## 💻 Technology stack

- Runtime: **Node.js**
- Framework: **Express**
- Database: **MongoDB**
- Cache / PubSub: **Redis** (used for pub/sub between services)
- Realtime: **Socket.io**
- Testing: **Jest**, **Supertest**
- Containerization: **Docker**, **docker-compose**

---

## ✅ Prerequisites

- Node.js >= 14
- npm or yarn
- Docker & Docker Compose (recommended for running the entire system)
- MongoDB and Redis (if running services locally)

---

## 🚀 Quick start (Docker)

1. Copy or create per-service `.env` files (there are sample variables in each service's `src/config/env.js`).
2. Start everything with Docker Compose:

```bash
# start all services using the included script
./scripts/start-all.sh

# tail logs
docker compose -f docker/docker-compose.yml logs -f

# stop all services
./scripts/stop-all.sh
````

Notes:

- The compose config and service-specific Dockerfiles are in `docker/` and each service folder respectively.

---

## 🛠 Local development

To run a single service locally:

```bash
cd <service-folder>
npm install
# check package.json for available scripts, e.g.:
npm run dev   # or
npm start
```

Make sure MongoDB and Redis are running locally and point service `.env` files at those instances.

---

## 🔐 Environment variables

Each service expects configuration via a `.env` file in its root. Common environment variables include:

- `PORT` — the listening port
- `MONGO_URI` — MongoDB connection string
- `REDIS_URL` — Redis connection
- `JWT_SECRET` — signing secret for tokens

Check `src/config/env.js` in each service for the full list of required/optional variables.

---

## 🧪 Testing

Run tests per service:

```bash
cd <service-folder>
npm test
```

Integration tests may require test instances of MongoDB and Redis.

---

## 📦 Deployment & Docker

- Build images and run with Docker Compose: `docker compose -f docker/docker-compose.yml up --build -d`
- Individual service Dockerfiles are in each service folder and additional Docker flavors are in `docker/*.Dockerfile`.

---

## 🤝 Contributing

If you'd like to contribute:

1. Fork the repo and create a branch for your feature/bugfix.
2. Run tests and make sure all services still work together.
3. Open a PR with a clear description of changes and any migration steps.

---

## 📄 License

This project does not include a license file by default — add a `LICENSE` file if you want to make licensing explicit.

---

If you want, I can also add per-service `README.md` files or a `CONTRIBUTING.md` template. ✅
docker network ls
docker network inspect sos-net

```

## 📄 License

This project is proprietary and confidential.

## 📧 Contact

For questions or support, please contact the development team.

---

**Last Updated**: December 2025
**Version**: 1.0.0
```

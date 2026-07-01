# API Gateway

The API Gateway acts as the single entry point for all client requests in the SOS Vehicle Backend platform.

It is responsible for:

- Request routing
- Reverse proxying
- Authentication middleware
- Authorization checks
- Rate limiting
- Logging
- Request validation
- Service orchestration
- Secure communication with internal microservices

All frontend requests must go through the API Gateway.

No frontend should directly access internal services.

---

# Architecture

```text
Client / Frontend
        ↓
API Gateway (Port 8000)
        ↓
------------------------------------------------
| Auth Service              (8001)             |
| User Service              (8002)             |
| Mechanic Service          (8003)             |
| SOS Service               (8004)             |
| Tracking Service          (8005)             |
| Admin Service             (8006)             |
| Notification Service      (9007)             |
| AI Chat Service           (8010)             |
| PDF Ingestion Service     (8011)             |
------------------------------------------------
# API Gateway

The API Gateway acts as a single entry point for all client requests to the SOS Vehicle application. It routes requests to the appropriate services and handles cross-cutting concerns such as authentication and logging.

## Structure

- **src/**: Contains the main application code.
- **middlewares/**: Middleware functions for request processing.
- **proxy/**: Logic for proxying requests to backend services.
- **routes/**: API routes for the gateway functionalities.

## Docker

This service can be containerized using the provided Dockerfile.

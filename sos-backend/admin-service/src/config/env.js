import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8006,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/sos-admin",

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  NODE_ENV: process.env.NODE_ENV || "development",

  // Other microservices (for stats / moderation)
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8002",
  MECHANIC_SERVICE_URL:
    process.env.MECHANIC_SERVICE_URL || "http://localhost:8003",
  SOS_SERVICE_URL: process.env.SOS_SERVICE_URL || "http://localhost:8004",
  TRACKING_SERVICE_URL:
    process.env.TRACKING_SERVICE_URL || "http://localhost:8005",
};

import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8004,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/sos-sos",

  // internal service URL for mechanic-service (used for auto-assignment)
  MECHANIC_SERVICE_URL:
    process.env.MECHANIC_SERVICE_URL || "http://localhost:8003",

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  NODE_ENV: process.env.NODE_ENV || "development",
};

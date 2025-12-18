import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/sos-auth",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access_secret_local",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret_local",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  NODE_ENV: process.env.NODE_ENV || "development",
};

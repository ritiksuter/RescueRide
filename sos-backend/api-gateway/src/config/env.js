import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV:
    process.env.NODE_ENV || "development",

  AUTH_SERVICE_URL:
    process.env.AUTH_SERVICE_URL,

  USER_SERVICE_URL:
    process.env.USER_SERVICE_URL,

  MECHANIC_SERVICE_URL:
    process.env.MECHANIC_SERVICE_URL,

  SOS_SERVICE_URL:
    process.env.SOS_SERVICE_URL,

  TRACKING_SERVICE_URL:
    process.env.TRACKING_SERVICE_URL,

  ADMIN_SERVICE_URL:
    process.env.ADMIN_SERVICE_URL,

  NOTIFICATION_SERVICE_URL:
    process.env.NOTIFICATION_SERVICE_URL,

  AI_CHAT_SERVICE_URL:
    process.env.AI_CHAT_SERVICE_URL,

  PDF_INGESTION_SERVICE_URL:
    process.env.PDF_INGESTION_SERVICE_URL,

  JWT_SECRET:
    process.env.JWT_SECRET,

  /**
   * Rate Limiting
   */
  RATE_LIMIT_WINDOW_MS:
    process.env.RATE_LIMIT_WINDOW_MS ||
    900000,

  RATE_LIMIT_MAX_REQUESTS:
    process.env.RATE_LIMIT_MAX_REQUESTS ||
    100,
};
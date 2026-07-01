import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

export const rateLimiter = rateLimit({
  windowMs:
    Number(config.RATE_LIMIT_WINDOW_MS) ||
    15 * 60 * 1000,

  max:
    Number(config.RATE_LIMIT_MAX_REQUESTS) ||
    100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },

  skipSuccessfulRequests: false,
});
import Redis from "ioredis";
import logger from "../utils/logger.js";

let redisClient;

/**
 * Connect Redis
 */
export const connectRedis = async () => {
  try {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
      maxRetriesPerRequest: null,
      retryStrategy: (times) => {
        return Math.min(times * 100, 3000);
      },
    });

    redisClient.on("connect", () => {
      logger.info("Redis connected successfully");
    });

    redisClient.on("error", (error) => {
      logger.error(`Redis Error: ${error.message}`);
    });

    return redisClient;
  } catch (error) {
    logger.error(
      `Redis Connection Failed: ${error.message}`
    );
    process.exit(1);
  }
};

/**
 * Get Redis Client
 */
export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error(
      "Redis client not initialized. Call connectRedis() first."
    );
  }

  return redisClient;
};
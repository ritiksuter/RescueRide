import Redis from "ioredis";
import { config } from "../config/env.js";

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

// Generic admin action event (for audit, notifications, etc.)
export const publishAdminAction = async (payload) => {
  await publishEvent("admin_events", "ADMIN_ACTION", payload);
};

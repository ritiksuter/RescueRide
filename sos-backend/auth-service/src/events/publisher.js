import Redis from "ioredis";
import { config } from "../config/env.js";

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

// Example: event used by user-service, notification-service, etc.
export const publishUserCreated = async (userPayload) => {
  await publishEvent("user_events", "USER_CREATED", userPayload);
};

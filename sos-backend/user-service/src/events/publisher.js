import Redis from "ioredis";
import { config } from "../config/env.js";

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

// Example: notify others that user profile was updated
export const publishUserProfileUpdated = async (payload) => {
  await publishEvent("user_events", "USER_PROFILE_UPDATED", payload);
};

// Example: vehicle updates (if needed)
export const publishUserVehicleUpdated = async (payload) => {
  await publishEvent("user_events", "USER_VEHICLE_UPDATED", payload);
};

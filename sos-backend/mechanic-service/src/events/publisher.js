import Redis from "ioredis";
import { config } from "../config/env.js";
import { EVENTS } from "../../shared/constants/events.js"; // adjust path

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

export const publishMechanicProfileUpdated = async (payload) => {
  await publishEvent("mechanic_events", "MECHANIC_PROFILE_UPDATED", payload);
};

export const publishMechanicStatusUpdated = async (payload) => {
  await publishEvent(
    "mechanic_events",
    EVENTS.MECHANIC_LOCATION_UPDATED || "MECHANIC_STATUS_UPDATED",
    payload
  );
};

import Redis from "ioredis";
import { config } from "../config/env.js";
import { EVENTS } from "../../shared/constants/events.js"; // adjust relative path

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

// Called when a location update is recorded
export const publishLocationUpdated = async (payload) => {
  await publishEvent("tracking_events", EVENTS.LOCATION_UPDATED, payload);
};

// Called when tracking / trip completes
export const publishTripCompleted = async (payload) => {
  await publishEvent("tracking_events", EVENTS.TRIP_COMPLETED, payload);
};

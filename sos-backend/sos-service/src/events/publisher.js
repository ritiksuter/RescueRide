import Redis from "ioredis";
import { config } from "../config/env.js";
import { EVENTS } from "../../shared/constants/events.js";

const redis = new Redis(config.REDIS_URL);

const publishEvent = async (channel, type, payload) => {
  const event = JSON.stringify({ type, payload });
  await redis.publish(channel, event);
};

export const publishSosCreated = async (payload) => {
  await publishEvent("sos_events", EVENTS.SOS_CREATED, payload);
};

export const publishSosStatusUpdated = async (payload) => {
  await publishEvent("sos_events", EVENTS.SOS_STATUS_UPDATED, payload);
};

export const publishMechanicAssigned = async (payload) => {
  await publishEvent("mechanic_events", EVENTS.MECHANIC_ASSIGNED, payload);
};

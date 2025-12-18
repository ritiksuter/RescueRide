import Redis from "ioredis";
import { config } from "../config/env.js";
import { EVENTS } from "../../shared/constants/events.js";
import {
  createSessionIfNotExists,
  completeTrackingSessionBySosId,
} from "../services/tracking.service.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initTrackingEventSubscriber = () => {
  const channels = ["mechanic_events", "sos_events"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("tracking-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(
      `tracking-service subscribed to ${count} channels: ${channels.join(", ")}`
    );
  });

  redis.on("message", async (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      await handleEvent(channel, type, payload);
    } catch (err) {
      console.error("tracking-service: failed to parse Redis message", err);
    }
  });
};

const handleEvent = async (channel, type, payload) => {
  if (channel === "mechanic_events") {
    switch (type) {
      case EVENTS.MECHANIC_ASSIGNED: {
        const { sosId, userId, mechanicId } = payload;
        if (!sosId || !userId || !mechanicId) return;
        await createSessionIfNotExists({
          sosId,
          userAuthId: userId,
          mechanicAuthId: mechanicId,
        });
        break;
      }
      default:
        break;
    }
  }

  if (channel === "sos_events") {
    switch (type) {
      case EVENTS.SOS_STATUS_UPDATED: {
        const { sosId, status } = payload;
        if (!sosId) return;

        // If SOS completed or cancelled -> close tracking
        if (["completed", "cancelled"].includes(status)) {
          await completeTrackingSessionBySosId(sosId, status);
        }
        break;
      }
      default:
        break;
    }
  }
};

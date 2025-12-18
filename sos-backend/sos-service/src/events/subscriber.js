import Redis from "ioredis";
import { config } from "../config/env.js";
import { EVENTS } from "../../shared/constants/events.js";
import { updateSosStatus } from "../repositories/sos.repository.js";
import { SOS_STATUS } from "../../shared/constants/status.js";

const r = new Redis(config.REDIS_URL);

export const redis = new Redis(config.REDIS_URL, {
  enableReadyCheck: false
});

export const initSosEventSubscriber = () => {
  const channels = ["mechanic_events", "tracking_events"];

  redis.subscribe(...channels, (err, count) => {
    if (err) {
      console.error("sos-service: failed to subscribe Redis:", err);
      return;
    }
    console.log(
      `sos-service subscribed to ${count} channels: ${channels.join(", ")}`
    );
  });

  redis.on("message", async (channel, message) => {
    try {
      const { type, payload } = JSON.parse(message);
      await handleEvent(channel, type, payload);
    } catch (err) {
      console.error("sos-service: failed to parse Redis message", err);
    }
  });
};

const handleEvent = async (channel, type, payload) => {
  if (channel === "tracking_events") {
    switch (type) {
      case EVENTS.TRIP_COMPLETED: {
        const { sosId } = payload;
        if (!sosId) return;
        await updateSosStatus(sosId, SOS_STATUS.COMPLETED);
        break;
      }
      default:
        break;
    }
  }

  // You can also react to mechanic_events here if needed (e.g. mechanic rejects, etc.)
};

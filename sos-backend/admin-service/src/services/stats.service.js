import axios from "axios";
import { config } from "../config/env.js";

const safeGet = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("Stats call failed:", url, err.message);
    return null;
  }
};

export const getSystemOverviewStats = async () => {
  // These endpoints are just suggestions; create them in your services if you want.
  const [authStats, userStats, mechanicStats, sosStats, trackingStats] =
    await Promise.all([
      safeGet(`${config.AUTH_SERVICE_URL}/health`),
      safeGet(`${config.USER_SERVICE_URL}/health`),
      safeGet(`${config.MECHANIC_SERVICE_URL}/health`),
      safeGet(`${config.SOS_SERVICE_URL}/health`),
      safeGet(`${config.TRACKING_SERVICE_URL}/health`),
    ]);

  return {
    authService: authStats,
    userService: userStats,
    mechanicService: mechanicStats,
    sosService: sosStats,
    trackingService: trackingStats,
  };
};

export const getServiceHealth = async () => {
  // Just basic up/down health from /health
  const services = [
    { name: "auth-service", url: config.AUTH_SERVICE_URL },
    { name: "user-service", url: config.USER_SERVICE_URL },
    { name: "mechanic-service", url: config.MECHANIC_SERVICE_URL },
    { name: "sos-service", url: config.SOS_SERVICE_URL },
    { name: "tracking-service", url: config.TRACKING_SERVICE_URL },
  ];

  const results = await Promise.all(
    services.map(async (s) => {
      const health = await safeGet(`${s.url}/health`);
      return {
        name: s.name,
        url: s.url,
        status: health?.status || "unknown",
        raw: health,
      };
    })
  );

  return results;
};

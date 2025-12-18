import { LocationPoint } from "../models/LocationPoint.model.js";

export const addLocationPoint = async ({
  sessionId,
  sosId,
  mechanicAuthId,
  lat,
  lng,
}) => {
  const point = new LocationPoint({
    sessionId,
    sosId,
    mechanicAuthId,
    location: { lat, lng },
  });

  return point.save();
};

export const getPointsBySessionId = async (sessionId, { limit = 500 } = {}) => {
  return LocationPoint.find({ sessionId })
    .sort({ recordedAt: 1 })
    .limit(limit);
};

export const getLatestPointBySessionId = async (sessionId) => {
  return LocationPoint.findOne({ sessionId }).sort({ recordedAt: -1 });
};

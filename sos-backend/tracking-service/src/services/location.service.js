import {
  addLocationPoint,
  getPointsBySessionId,
  getLatestPointBySessionId,
} from "../repositories/location.repository.js";
import {
  createSessionIfNotExists,
  getTrackingSessionBySosId,
  updateLatestLocationInSession,
} from "./tracking.service.js";
import { publishLocationUpdated } from "../events/publisher.js";

export const addLocationForSos = async ({
  sosId,
  userAuthId,
  mechanicAuthId,
  lat,
  lng,
}) => {
  // Ensure session exists
  let session = await createSessionIfNotExists({
    sosId,
    userAuthId,
    mechanicAuthId,
  });

  const point = await addLocationPoint({
    sessionId: session._id,
    sosId,
    mechanicAuthId,
    lat,
    lng,
  });

  const at = point.recordedAt || new Date();
  session = await updateLatestLocationInSession(session._id, { lat, lng, at });

  await publishLocationUpdated({
    sosId,
    mechanicId: mechanicAuthId,
    userId: userAuthId,
    lat,
    lng,
    at,
  });

  return { session, point };
};

export const getLocationHistoryBySosId = async (sosId) => {
  const session = await getTrackingSessionBySosId(sosId);
  const points = await getPointsBySessionId(session._id, { limit: 1000 });
  return { session, points };
};

export const getLatestLocationBySosId = async (sosId) => {
  const session = await getTrackingSessionBySosId(sosId);
  const latestPoint = await getLatestPointBySessionId(session._id);
  return { session, latestPoint };
};

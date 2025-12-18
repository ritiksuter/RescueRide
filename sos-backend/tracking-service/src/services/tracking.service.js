import {
  createSession,
  findActiveSessionBySosId,
  findSessionById,
  findSessionBySosId,
  updateSession,
  completeSession,
  cancelSession,
} from "../repositories/tracking.repository.js";
import { publishTripCompleted } from "../events/publisher.js";

export const createSessionIfNotExists = async ({
  sosId,
  userAuthId,
  mechanicAuthId,
}) => {
  let session = await findActiveSessionBySosId(sosId);
  if (session) return session;

  session = await createSession({
    sosId,
    userAuthId,
    mechanicAuthId,
  });

  return session;
};

export const getTrackingSessionBySosId = async (sosId) => {
  const session = await findSessionBySosId(sosId);
  if (!session) {
    const err = new Error("Tracking session not found");
    err.status = 404;
    throw err;
  }
  return session;
};

export const getTrackingSessionById = async (id) => {
  const session = await findSessionById(id);
  if (!session) {
    const err = new Error("Tracking session not found");
    err.status = 404;
    throw err;
  }
  return session;
};

export const updateLatestLocationInSession = async (
  sessionId,
  { lat, lng, at }
) => {
  return updateSession(sessionId, {
    latestLocation: { lat, lng, at },
  });
};

export const completeTrackingSessionBySosId = async (sosId, reasonStatus) => {
  const session = await findSessionBySosId(sosId);
  if (!session) return null;

  const updated =
    reasonStatus === "cancelled"
      ? await cancelSession(session._id)
      : await completeSession(session._id);

  await publishTripCompleted({
    sosId: updated.sosId,
    userId: updated.userAuthId,
    mechanicId: updated.mechanicAuthId,
    status: updated.status,
    endedAt: updated.endedAt,
  });

  return updated;
};

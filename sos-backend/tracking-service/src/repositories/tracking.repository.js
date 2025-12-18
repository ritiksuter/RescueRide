import { TrackingSession } from "../models/TrackingSession.model.js";

export const createSession = async ({
  sosId,
  userAuthId,
  mechanicAuthId,
  meta,
}) => {
  const session = new TrackingSession({
    sosId,
    userAuthId,
    mechanicAuthId,
    meta,
  });
  return session.save();
};

export const findActiveSessionBySosId = async (sosId) => {
  return TrackingSession.findOne({ sosId, status: "active" });
};

export const findSessionById = async (id) => {
  return TrackingSession.findById(id);
};

export const findSessionBySosId = async (sosId) => {
  return TrackingSession.findOne({ sosId }).sort({ createdAt: -1 });
};

export const updateSession = async (id, updateData) => {
  return TrackingSession.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
};

export const completeSession = async (id) => {
  return TrackingSession.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "completed",
        endedAt: new Date(),
      },
    },
    { new: true }
  );
};

export const cancelSession = async (id) => {
  return TrackingSession.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "cancelled",
        endedAt: new Date(),
      },
    },
    { new: true }
  );
};

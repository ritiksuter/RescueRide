import { SosRequest } from "../models/SosRequest.model.js";
import { SOS_STATUS } from "../../shared/constants/status.js";

export const createSos = async (data) => {
  const sos = new SosRequest(data);
  return sos.save();
};

export const findById = async (id) => {
  return SosRequest.findById(id);
};

export const findByUser = async (userAuthId, { limit = 20, skip = 0 } = {}) => {
  return SosRequest.find({ userAuthId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const findByMechanic = async (
  mechanicAuthId,
  { limit = 20, skip = 0 } = {}
) => {
  return SosRequest.find({ mechanicAuthId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const findActiveForUser = async (userAuthId) => {
  return SosRequest.find({
    userAuthId,
    status: { $in: [SOS_STATUS.PENDING, SOS_STATUS.ACCEPTED, SOS_STATUS.IN_PROGRESS] },
  }).sort({ createdAt: -1 });
};

export const findActiveForMechanic = async (mechanicAuthId) => {
  return SosRequest.find({
    mechanicAuthId,
    status: { $in: [SOS_STATUS.PENDING, SOS_STATUS.ACCEPTED, SOS_STATUS.IN_PROGRESS] },
  }).sort({ createdAt: -1 });
};

export const updateSosById = async (id, updateData) => {
  return SosRequest.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

export const assignMechanicToSos = async (id, mechanicAuthId, meta = {}) => {
  return SosRequest.findByIdAndUpdate(
    id,
    {
      $set: {
        mechanicAuthId,
        assignment: {
          distanceKm: meta.distanceKm || null,
          estimatedArrivalMinutes: meta.estimatedArrivalMinutes || null,
          assignedAt: new Date(),
        },
        status: SOS_STATUS.ACCEPTED,
      },
    },
    { new: true }
  );
};

export const updateSosStatus = async (id, status, extra = {}) => {
  return SosRequest.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
        ...extra,
      },
    },
    { new: true }
  );
};

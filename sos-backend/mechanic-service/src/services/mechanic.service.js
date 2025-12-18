import {
  findByAuthUserId,
  updateProfile,
  getMechanicById,
} from "../repositories/mechanic.repository.js";
import {
  getStatusByAuthUserId,
  upsertStatus,
} from "../repositories/status.repository.js";
import { publishMechanicProfileUpdated, publishMechanicStatusUpdated } from "../events/publisher.js";
import { MECHANIC_STATUS } from "../../shared/constants/status.js";

export const getMyMechanicProfile = async (authUserId) => {
  const profile = await findByAuthUserId(authUserId);
  if (!profile) {
    const err = new Error("Mechanic profile not found");
    err.status = 404;
    throw err;
  }
  return profile;
};

export const updateMyMechanicProfile = async (authUserId, payload) => {
  const profile = await updateProfile(authUserId, payload);
  if (!profile) {
    const err = new Error("Mechanic profile not found");
    err.status = 404;
    throw err;
  }

  await publishMechanicProfileUpdated({
    mechanicAuthUserId: authUserId,
    profile,
  });

  return profile;
};

export const getMyStatus = async (authUserId) => {
  const status = await getStatusByAuthUserId(authUserId);
  if (!status) {
    // default offline if not present
    return {
      mechanicAuthUserId: authUserId,
      status: MECHANIC_STATUS.OFFLINE,
      location: null,
    };
  }
  return status;
};

export const updateMyStatus = async (authUserId, statusValue) => {
  const status = await upsertStatus(authUserId, { status: statusValue });

  await publishMechanicStatusUpdated({
    mechanicAuthUserId: authUserId,
    status: status.status,
    location: status.location,
    lastUpdatedAt: status.lastUpdatedAt,
  });

  return status;
};

export const updateMyLocation = async (authUserId, { lat, lng }) => {
  const status = await upsertStatus(authUserId, {
    location: { lat, lng },
    status: MECHANIC_STATUS.AVAILABLE, // usually location update means online
  });

  await publishMechanicStatusUpdated({
    mechanicAuthUserId: authUserId,
    status: status.status,
    location: status.location,
    lastUpdatedAt: status.lastUpdatedAt,
  });

  return status;
};

export const getMechanicWithStatus = async (authUserId) => {
  const [profile, status] = await Promise.all([
    getMechanicById(authUserId),
    getStatusByAuthUserId(authUserId),
  ]);

  if (!profile) {
    const err = new Error("Mechanic profile not found");
    err.status = 404;
    throw err;
  }

  return {
    profile,
    status: status || {
      mechanicAuthUserId: authUserId,
      status: MECHANIC_STATUS.OFFLINE,
      location: null,
    },
  };
};

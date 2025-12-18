import {
  createSos,
  findById,
  findByUser,
  findByMechanic,
  findActiveForUser,
  findActiveForMechanic,
  updateSosStatus,
} from "../repositories/sos.repository.js";
import { publishSosCreated, publishSosStatusUpdated } from "../events/publisher.js";
import { SOS_STATUS } from "../../shared/constants/status.js";

export const createSosRequest = async ({
  userAuthId,
  sosType,
  problemDescription,
  userLocation,
  vehicle,
  meta,
}) => {
  const sos = await createSos({
    userAuthId,
    sosType,
    problemDescription,
    userLocation,
    vehicle,
    meta,
  });

  await publishSosCreated({
    sosId: sos._id.toString(),
    userAuthId: sos.userAuthId,
    mechanicAuthId: sos.mechanicAuthId,
    status: sos.status,
    userLocation: sos.userLocation,
    vehicle: sos.vehicle,
    createdAt: sos.createdAt,
  });

  return sos;
};

export const getSosById = async (id) => {
  const sos = await findById(id);
  if (!sos) {
    const error = new Error("SOS request not found");
    error.status = 404;
    throw error;
  }
  return sos;
};

export const getUserSosList = async (userAuthId, params) => {
  return findByUser(userAuthId, params);
};

export const getMechanicSosList = async (mechanicAuthId, params) => {
  return findByMechanic(mechanicAuthId, params);
};

export const getActiveSosForUser = async (userAuthId) => {
  return findActiveForUser(userAuthId);
};

export const getActiveSosForMechanic = async (mechanicAuthId) => {
  return findActiveForMechanic(mechanicAuthId);
};

export const cancelSosByUser = async (sosId, userAuthId) => {
  const sos = await getSosById(sosId);
  if (sos.userAuthId !== userAuthId) {
    const error = new Error("You are not allowed to cancel this SOS");
    error.status = 403;
    throw error;
  }

  if (![SOS_STATUS.PENDING, SOS_STATUS.ACCEPTED].includes(sos.status)) {
    const error = new Error("SOS cannot be cancelled in current status");
    error.status = 400;
    throw error;
  }

  const updated = await updateSosStatus(sosId, SOS_STATUS.CANCELLED, {
    cancelledBy: "user",
  });

  await publishSosStatusUpdated({
    sosId: updated._id.toString(),
    status: updated.status,
    cancelledBy: updated.cancelledBy,
  });

  return updated;
};

export const updateSosStatusService = async (sosId, status, actorRole) => {
  const updated = await updateSosStatus(sosId, status, {
    cancelledBy: status === SOS_STATUS.CANCELLED ? actorRole : null,
  });

  await publishSosStatusUpdated({
    sosId: updated._id.toString(),
    status: updated.status,
    cancelledBy: updated.cancelledBy,
  });

  return updated;
};

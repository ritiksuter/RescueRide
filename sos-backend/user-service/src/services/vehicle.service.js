import {
  getVehicles,
  addVehicle,
  updateVehicle,
  removeVehicle,
} from "../repositories/user.repository.js";

export const getUserVehicles = async (authUserId) => {
  return getVehicles(authUserId);
};

export const addUserVehicle = async (authUserId, vehicleData) => {
  const profile = await addVehicle(authUserId, vehicleData);
  if (!profile) {
    const error = new Error("User profile not found");
    error.status = 404;
    throw error;
  }
  return profile.vehicles;
};

export const updateUserVehicle = async (
  authUserId,
  vehicleId,
  updateData
) => {
  const profile = await updateVehicle(authUserId, vehicleId, updateData);
  if (!profile) {
    const error = new Error("User profile or vehicle not found");
    error.status = 404;
    throw error;
  }
  return profile.vehicles;
};

export const deleteUserVehicle = async (authUserId, vehicleId) => {
  const profile = await removeVehicle(authUserId, vehicleId);
  if (!profile) {
    const error = new Error("User profile or vehicle not found");
    error.status = 404;
    throw error;
  }
  return profile.vehicles;
};

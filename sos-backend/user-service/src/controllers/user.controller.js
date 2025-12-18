import { getUserProfile, updateUserProfile } from "../services/user.service.js";
import {
  getUserVehicles,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle,
} from "../services/vehicle.service.js";
import { success, failure } from "../utils/response.js";
import { publishUserProfileUpdated, publishUserVehicleUpdated } from "../events/publisher.js";

export const getMyProfileController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const profile = await getUserProfile(authUserId);
    return success(res, "Profile fetched", profile);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const updateMyProfileController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const updateData = req.body;

    const profile = await updateUserProfile(authUserId, updateData);

    // publish event
    await publishUserProfileUpdated({
      authUserId,
      profile,
    });

    return success(res, "Profile updated", profile);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

// VEHICLES

export const getMyVehiclesController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const vehicles = await getUserVehicles(authUserId);
    return success(res, "Vehicles fetched", vehicles);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const addVehicleController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const vehicleData = req.body;

    const vehicles = await addUserVehicle(authUserId, vehicleData);

    await publishUserVehicleUpdated({
      authUserId,
      vehicles,
      action: "added",
    });

    return success(res, "Vehicle added", vehicles, 201);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const updateVehicleController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const { vehicleId } = req.params;
    const updateData = req.body;

    const vehicles = await updateUserVehicle(authUserId, vehicleId, updateData);

    await publishUserVehicleUpdated({
      authUserId,
      vehicles,
      action: "updated",
      vehicleId,
    });

    return success(res, "Vehicle updated", vehicles);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const deleteVehicleController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const { vehicleId } = req.params;

    const vehicles = await deleteUserVehicle(authUserId, vehicleId);

    await publishUserVehicleUpdated({
      authUserId,
      vehicles,
      action: "deleted",
      vehicleId,
    });

    return success(res, "Vehicle deleted", vehicles);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

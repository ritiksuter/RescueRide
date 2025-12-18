import { success, failure } from "../utils/response.js";
import {
  getMyMechanicProfile,
  updateMyMechanicProfile,
  getMyStatus,
  updateMyStatus,
  updateMyLocation,
} from "../services/mechanic.service.js";
import { findNearbyMechanics } from "../services/location.service.js";
import { MECHANIC_STATUS } from "../../shared/constants/status.js";

export const getMyProfileController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const profile = await getMyMechanicProfile(authUserId);
    return success(res, "Mechanic profile fetched", profile);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const updateMyProfileController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const profile = await updateMyMechanicProfile(authUserId, req.body);
    return success(res, "Mechanic profile updated", profile);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getMyStatusController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const status = await getMyStatus(authUserId);
    return success(res, "Mechanic status fetched", status);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const updateMyStatusController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const { status } = req.body;

    if (!status || !Object.values(MECHANIC_STATUS).includes(status)) {
      return failure(res, "Invalid status", 400);
    }

    const updated = await updateMyStatus(authUserId, status);
    return success(res, "Mechanic status updated", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const updateMyLocationController = async (req, res) => {
  try {
    const authUserId = req.user.id;
    const { lat, lng } = req.body;

    if (lat == null || lng == null) {
      return failure(res, "lat and lng are required", 400);
    }

    const updated = await updateMyLocation(authUserId, { lat, lng });
    return success(res, "Mechanic location updated", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const findNearbyMechanicsController = async (req, res) => {
  try {
    const { lat, lng, radiusKm } = req.query;

    if (lat == null || lng == null) {
      return failure(res, "lat and lng query params are required", 400);
    }

    const radius = radiusKm ? Number(radiusKm) : 10;

    const mechanics = await findNearbyMechanics({
      lat: Number(lat),
      lng: Number(lng),
      radiusKm: radius,
    });

    return success(res, "Nearby mechanics fetched", mechanics);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

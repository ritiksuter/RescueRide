import { success, failure } from "../utils/response.js";
import {
  getTrackingSessionBySosId,
} from "../services/tracking.service.js";
import {
  addLocationForSos,
  getLocationHistoryBySosId,
  getLatestLocationBySosId,
} from "../services/location.service.js";
import { ROLES } from "../../shared/constants/roles.js";

export const getTrackingSessionBySosController = async (req, res) => {
  try {
    const { sosId } = req.params;
    const session = await getTrackingSessionBySosId(sosId);

    // Simple access control – in real world you might call sos-service to verify
    const { id: authUserId, role } = req.user;
    if (
      role === ROLES.USER &&
      session.userAuthId !== authUserId
    ) {
      return failure(res, "You are not allowed to view this tracking", 403);
    }

    if (
      role === ROLES.MECHANIC &&
      session.mechanicAuthId !== authUserId
    ) {
      return failure(res, "You are not allowed to view this tracking", 403);
    }

    return success(res, "Tracking session fetched", session);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const addLocationController = async (req, res) => {
  try {
    const { sosId, lat, lng, userAuthId } = req.body;
    const mechanicAuthId = req.user.id;

    if (!sosId || lat == null || lng == null) {
      return failure(res, "sosId, lat and lng are required", 400);
    }

    // userAuthId can be optional if you want to resolve from sos-service; here pass from client if known
    const userId =
      userAuthId || req.body.userId || req.user.userId || "unknown-user";

    const result = await addLocationForSos({
      sosId,
      userAuthId: userId,
      mechanicAuthId,
      lat: Number(lat),
      lng: Number(lng),
    });

    return success(res, "Location updated", result);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getLocationHistoryController = async (req, res) => {
  try {
    const { sosId } = req.params;
    const data = await getLocationHistoryBySosId(sosId);
    return success(res, "Tracking history fetched", data);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getLatestLocationController = async (req, res) => {
  try {
    const { sosId } = req.params;
    const data = await getLatestLocationBySosId(sosId);
    return success(res, "Latest location fetched", data);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

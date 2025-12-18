import { success, failure } from "../utils/response.js";
import {
  getRecentAdminActions,
  getActionsForTarget,
} from "../services/admin.service.js";
import {
  blockUser,
  blockMechanic,
  forceCancelSos,
} from "../services/moderation.service.js";

export const getAdminActionsController = async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const actions = await getRecentAdminActions({
      limit: limit ? Number(limit) : 50,
      skip: skip ? Number(skip) : 0,
    });

    return success(res, "Admin actions fetched", actions);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getTargetActionsController = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;

    const actions = await getActionsForTarget(targetType, targetId);

    return success(res, "Admin actions for target fetched", actions);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const blockUserController = async (req, res) => {
  try {
    const adminAuthId = req.user.id;
    const { userAuthId, reason } = req.body;

    if (!userAuthId) {
      return failure(res, "userAuthId is required", 400);
    }

    const action = await blockUser({ adminAuthId, userAuthId, reason });

    return success(res, "User block command recorded", action);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const blockMechanicController = async (req, res) => {
  try {
    const adminAuthId = req.user.id;
    const { mechanicAuthId, reason } = req.body;

    if (!mechanicAuthId) {
      return failure(res, "mechanicAuthId is required", 400);
    }

    const action = await blockMechanic({ adminAuthId, mechanicAuthId, reason });

    return success(res, "Mechanic block command recorded", action);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const forceCancelSosController = async (req, res) => {
  try {
    const adminAuthId = req.user.id;
    const { sosId, reason } = req.body;

    if (!sosId) {
      return failure(res, "sosId is required", 400);
    }

    const action = await forceCancelSos({ adminAuthId, sosId, reason });

    return success(res, "SOS force-cancel command recorded", action);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

import { success, failure } from "../utils/response.js";
import {
  createSosRequest,
  getSosById,
  getUserSosList,
  getMechanicSosList,
  getActiveSosForUser,
  getActiveSosForMechanic,
  cancelSosByUser,
} from "../services/sos.service.js";
import {
  autoAssignMechanic,
  assignMechanicManually,
} from "../services/assignment.service.js";
import {
  startSosJob,
  completeSosJob,
  cancelSosJob,
} from "../services/statusUpdate.service.js";
import { ROLES } from "../../shared/constants/roles.js";

export const createSosController = async (req, res) => {
  try {
    const userAuthId = req.user.id;

    const {
      sosType,
      problemDescription,
      userLocation,
      vehicle,
      autoAssign = true,
    } = req.body;

    if (!userLocation?.lat || !userLocation?.lng) {
      return failure(res, "userLocation.lat and userLocation.lng are required", 400);
    }

    const sos = await createSosRequest({
      userAuthId,
      sosType,
      problemDescription,
      userLocation,
      vehicle,
      meta: {},
    });

    let updated = sos;
    if (autoAssign) {
      try {
        updated = await autoAssignMechanic(sos._id.toString());
      } catch (err) {
        // If auto-assign fails, we still return created SOS
        console.error("Auto assignment failed:", err.message);
      }
    }

    return success(res, "SOS request created", updated, 201);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getSosByIdController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const sos = await getSosById(sosId);

    const { role, id: authUserId } = req.user;

    if (role === ROLES.USER && sos.userAuthId !== authUserId) {
      return failure(res, "You are not allowed to view this SOS", 403);
    }

    if (role === ROLES.MECHANIC && sos.mechanicAuthId !== authUserId) {
      return failure(res, "You are not allowed to view this SOS", 403);
    }

    return success(res, "SOS fetched", sos);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getMySosController = async (req, res) => {
  try {
    const { role, id: authUserId } = req.user;

    let list = [];
    if (role === ROLES.USER) {
      list = await getUserSosList(authUserId, {});
    } else if (role === ROLES.MECHANIC) {
      list = await getMechanicSosList(authUserId, {});
    } else if (role === ROLES.ADMIN) {
      // For simplicity, admin not implemented here; can add later.
      list = [];
    }

    return success(res, "SOS list fetched", list);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getMyActiveSosController = async (req, res) => {
  try {
    const { role, id: authUserId } = req.user;

    let list = [];
    if (role === ROLES.USER) {
      list = await getActiveSosForUser(authUserId);
    } else if (role === ROLES.MECHANIC) {
      list = await getActiveSosForMechanic(authUserId);
    }

    return success(res, "Active SOS list fetched", list);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const cancelMySosController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const userAuthId = req.user.id;

    const updated = await cancelSosByUser(sosId, userAuthId);
    return success(res, "SOS cancelled", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const assignMechanicController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const { mechanicAuthId } = req.body;

    const updated = await assignMechanicManually(sosId, mechanicAuthId);

    return success(res, "Mechanic assigned to SOS", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const startSosJobController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const role = req.user.role;

    const updated = await startSosJob(sosId, role);
    return success(res, "SOS job started", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const completeSosJobController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const role = req.user.role;

    const updated = await completeSosJob(sosId, role);
    return success(res, "SOS job completed", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const cancelSosJobController = async (req, res) => {
  try {
    const sosId = req.params.id;
    const role = req.user.role;

    const updated = await cancelSosJob(sosId, role);
    return success(res, "SOS job cancelled", updated);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

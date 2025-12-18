import axios from "axios";
import { config } from "../config/env.js";
import { recordAdminAction } from "./admin.service.js";

// You can later implement actual endpoints in other services to handle these.
export const blockUser = async ({ adminAuthId, userAuthId, reason }) => {
  // Example: call auth-service or user-service to deactivate user
  try {
    // await axios.post(`${config.AUTH_SERVICE_URL}/auth/admin/block-user`, {
    //   userAuthId,
    //   reason,
    // });
  } catch (err) {
    console.error("Failed to call user block endpoint:", err.message);
  }

  return recordAdminAction({
    adminAuthId,
    actionType: "BLOCK_USER",
    targetType: "user",
    targetId: userAuthId,
    reason,
    meta: {},
  });
};

export const blockMechanic = async ({ adminAuthId, mechanicAuthId, reason }) => {
  try {
    // await axios.post(`${config.MECHANIC_SERVICE_URL}/mechanic/admin/block`, {
    //   mechanicAuthId,
    //   reason,
    // });
  } catch (err) {
    console.error("Failed to call mechanic block endpoint:", err.message);
  }

  return recordAdminAction({
    adminAuthId,
    actionType: "BLOCK_MECHANIC",
    targetType: "mechanic",
    targetId: mechanicAuthId,
    reason,
    meta: {},
  });
};

export const forceCancelSos = async ({ adminAuthId, sosId, reason }) => {
  try {
    // await axios.post(`${config.SOS_SERVICE_URL}/sos/${sosId}/job-cancel`, {
    //   byAdmin: true,
    //   reason,
    // });
  } catch (err) {
    console.error("Failed to call SOS cancel endpoint:", err.message);
  }

  return recordAdminAction({
    adminAuthId,
    actionType: "FORCE_CANCEL_SOS",
    targetType: "sos",
    targetId: sosId,
    reason,
    meta: {},
  });
};

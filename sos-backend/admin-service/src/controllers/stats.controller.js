import { success, failure } from "../utils/response.js";
import {
  getSystemOverviewStats,
  getServiceHealth,
} from "../services/stats.service.js";

export const getOverviewStatsController = async (req, res) => {
  try {
    const stats = await getSystemOverviewStats();
    return success(res, "System overview stats fetched", stats);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

export const getServiceHealthController = async (req, res) => {
  try {
    const stats = await getServiceHealth();
    return success(res, "Service health fetched", stats);
  } catch (err) {
    return failure(res, err.message, err.status || 500);
  }
};

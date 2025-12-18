import { Router } from "express";
import {
  getOverviewStatsController,
  getServiceHealthController,
} from "../controllers/stats.controller.js";
import { verifyToken } from "../shared/middlewares/verifyToken.js";
import { roleGuard } from "../shared/middlewares/roleGuard.js";
import { ROLES } from "../shared/constants/roles.js";

const router = Router();

// Only admins can view system stats
router.use(verifyToken, roleGuard(ROLES.ADMIN));

router.get("/overview", getOverviewStatsController);
router.get("/services", getServiceHealthController);

export default router;

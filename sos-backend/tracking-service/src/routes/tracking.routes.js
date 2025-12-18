import { Router } from "express";
import {
  getTrackingSessionBySosController,
  addLocationController,
  getLocationHistoryController,
  getLatestLocationController,
} from "../controllers/tracking.controller.js";
import { verifyToken } from "../../shared/middlewares/verifyToken.js";
import { roleGuard } from "../../shared/middlewares/roleGuard.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

// Mechanic sends location updates
router.post(
  "/location",
  verifyToken,
  roleGuard(ROLES.MECHANIC),
  addLocationController
);

// Get tracking session info
router.get(
  "/session/:sosId",
  verifyToken,
  getTrackingSessionBySosController
);

// Full history & latest location (user / mechanic / admin)
router.get(
  "/history/:sosId",
  verifyToken,
  getLocationHistoryController
);

router.get(
  "/latest/:sosId",
  verifyToken,
  getLatestLocationController
);

export default router;

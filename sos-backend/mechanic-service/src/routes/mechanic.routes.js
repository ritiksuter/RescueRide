import { Router } from "express";
import {
  getMyProfileController,
  updateMyProfileController,
  getMyStatusController,
  updateMyStatusController,
  updateMyLocationController,
  findNearbyMechanicsController,
} from "../controllers/mechanic.controller.js";
import { verifyToken } from "../../shared/middlewares/verifyToken.js";
import { roleGuard } from "../../shared/middlewares/roleGuard.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

// Mechanic self APIs
router.get("/me/profile", verifyToken, roleGuard(ROLES.MECHANIC), getMyProfileController);
router.put("/me/profile", verifyToken, roleGuard(ROLES.MECHANIC), updateMyProfileController);

router.get("/me/status", verifyToken, roleGuard(ROLES.MECHANIC), getMyStatusController);
router.put("/me/status", verifyToken, roleGuard(ROLES.MECHANIC), updateMyStatusController);
router.put("/me/location", verifyToken, roleGuard(ROLES.MECHANIC), updateMyLocationController);

// For users/admin to search nearby mechanics
router.get("/nearby", verifyToken, findNearbyMechanicsController);

export default router;

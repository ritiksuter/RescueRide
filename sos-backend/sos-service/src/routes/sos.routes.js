import { Router } from "express";
import {
  createSosController,
  getSosByIdController,
  getMySosController,
  getMyActiveSosController,
  cancelMySosController,
  assignMechanicController,
  startSosJobController,
  completeSosJobController,
  cancelSosJobController,
} from "../controllers/sos.controller.js";
import { verifyToken } from "../../shared/middlewares/verifyToken.js";
import { roleGuard } from "../../shared/middlewares/roleGuard.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

// User creates SOS
router.post("/", verifyToken, roleGuard(ROLES.USER), createSosController);

// Fetch single SOS
router.get("/:id", verifyToken, getSosByIdController);

// My SOS list (user or mechanic)
router.get("/me/list", verifyToken, getMySosController);

// My active SOS (user or mechanic)
router.get("/me/active", verifyToken, getMyActiveSosController);

// User cancels own SOS
router.post("/:id/cancel", verifyToken, roleGuard(ROLES.USER), cancelMySosController);

// Admin manually assigns mechanic
router.post(
  "/:id/assign",
  verifyToken,
  roleGuard(ROLES.ADMIN),
  assignMechanicController
);

// Start / complete / cancel job (mechanic or admin)
router.post(
  "/:id/start",
  verifyToken,
  roleGuard(ROLES.MECHANIC, ROLES.ADMIN),
  startSosJobController
);
router.post(
  "/:id/complete",
  verifyToken,
  roleGuard(ROLES.MECHANIC, ROLES.ADMIN),
  completeSosJobController
);
router.post(
  "/:id/job-cancel",
  verifyToken,
  roleGuard(ROLES.MECHANIC, ROLES.ADMIN),
  cancelSosJobController
);

export default router;

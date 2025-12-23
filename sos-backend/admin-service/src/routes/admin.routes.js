import { Router } from "express";
import {
  getAdminActionsController,
  getTargetActionsController,
  blockUserController,
  blockMechanicController,
  forceCancelSosController,
} from "../controllers/admin.controller.js";
import { verifyToken } from "../shared/middlewares/verifyToken.js";
import { roleGuard } from "../shared/middlewares/roleGuard.js";
import { ROLES } from "../shared/constants/roles.js";

const router = Router();

// All admin routes require admin role
router.use(verifyToken, roleGuard(ROLES.ADMIN));

router.get("/actions", getAdminActionsController);
router.get("/actions/:targetType/:targetId", getTargetActionsController);

router.post("/moderation/block-user", blockUserController);
router.post("/moderation/block-mechanic", blockMechanicController);
router.post("/moderation/force-cancel-sos", forceCancelSosController);

export default router;
import { Router } from "express";
import {
  registerController,
  loginController,
  refreshTokenController,
  meController,
  authMiddleware,
  blockUserController,
  unblockUserController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.get("/me", authMiddleware, meController);

router.patch("/admin/block-user", blockUserController);
router.patch("/admin/unblock-user", unblockUserController);

export default router;
import { Router } from "express";
import {
  registerController,
  loginController,
  refreshTokenController,
  meController,
  authMiddleware,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.get("/me", authMiddleware, meController);

export default router;

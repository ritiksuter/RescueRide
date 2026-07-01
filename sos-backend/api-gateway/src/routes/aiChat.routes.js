import { Router } from "express";
import {
  forwardToService,
  services,
} from "../proxy/serviceProxy.js";

const router = Router();

/**
 * Forward all AI Chat requests
 * to AI Chat Service
 */
router.use(
  "/",
  forwardToService(services.aiChat)
);

export default router;
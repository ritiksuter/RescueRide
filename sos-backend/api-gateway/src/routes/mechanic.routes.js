import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { forwardToService, services } from "../proxy/serviceProxy.js";

const router = Router();

router.use(authenticate);
router.use("/", forwardToService(services.mechanic));

export default router;

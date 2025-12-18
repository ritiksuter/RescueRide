import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { forwardToService, services } from "../proxy/serviceProxy.js";

const router = Router();

router.use(authenticate);

// You can validate roles here:
// if (req.user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

router.use("/", forwardToService(services.admin));

export default router;

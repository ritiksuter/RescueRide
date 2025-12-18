import { Router } from "express";
import { forwardToService, services } from "../proxy/serviceProxy.js";

const router = Router();

router.use("/", forwardToService(services.auth));

export default router;

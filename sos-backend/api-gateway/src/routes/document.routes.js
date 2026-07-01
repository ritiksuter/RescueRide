import { Router } from "express";

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

import {
  forwardToService,
  services,
} from "../proxy/serviceProxy.js";

const router = Router();

router.use(
  authenticate,
  authorizeAdmin
);

router.use(
  "/",
  forwardToService(
    services.pdfIngestion
  )
);

export default router;
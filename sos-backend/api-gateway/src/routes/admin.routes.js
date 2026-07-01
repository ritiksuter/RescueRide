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
    services.admin
  )
);

/**
 * PDF Knowledge Base Management
 *
 * Base:
 * /api/admin/documents/*
 *
 * Forwarded to:
 * pdf-ingestion-service
 */
router.use(
  "/documents",
  forwardToService(
    services.pdfIngestion
  )
);

export default router;
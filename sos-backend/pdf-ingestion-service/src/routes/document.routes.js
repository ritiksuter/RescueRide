import express from "express";

import { uploadDocument } from "../controllers/document.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * Upload PDF for ingestion
 *
 * POST /api/documents/upload
 */
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadDocument
);

export default router;
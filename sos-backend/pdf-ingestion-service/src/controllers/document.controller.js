import { v4 as uuidv4 } from "uuid";

import logger from "../utils/logger.js";
import Document from "../models/document.model.js";
import {addIngestionJob} from "../services/queue.service.js";

export const uploadDocument = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const document = await Document.create({
      documentId: uuidv4(),

      fileName: req.file.filename,
      originalName: req.file.originalname,

      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,

      uploadedBy: req.user.id,

      ingestionStatus: "PENDING",
    });

    await addIngestionJob({
      documentId:
        document.documentId,

      filePath:
        document.filePath,
    });

    return res.status(201).json({
      success: true,
      message:
        "Document uploaded successfully",

      data: {
        documentId:
          document.documentId,

        status:
          document.ingestionStatus,
      },
    });
  } catch (error) {
    logger.error(
      `Upload Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload document",
    });
  }
};
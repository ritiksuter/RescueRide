import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Ensure uploads directory exists
 */
const uploadDir = "uploads/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Multer Storage Configuration
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

/**
 * File Filter
 * Allow only PDF files
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(
      new Error("Only PDF files are allowed"),
      false
    );
  }

  cb(null, true);
};

/**
 * Upload Middleware
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

export default upload;
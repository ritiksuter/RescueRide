import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: String,
      required: true,
    },

    ingestionStatus: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
      ],
      default: "PENDING",
    },

    totalChunks: {
      type: Number,
      default: 0,
    },

    pineconeNamespace: {
      type: String,
      default: null,
    },

    ingestionError: {
      type: String,
      default: null,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model(
  "Document",
  documentSchema
);

export default Document;
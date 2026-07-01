import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import logger from "../utils/logger.js";

const extractTextFromPDF = async (filePath) => {
  try {
    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    return {
      text: docs
        .map(doc => doc.pageContent)
        .join("\n"),
      totalPages: docs.length,
    };
  } catch (error) {
    logger.error(
      `PDF Extraction Failed: ${error.message}`
    );
    throw error;
  }
};

export default extractTextFromPDF;
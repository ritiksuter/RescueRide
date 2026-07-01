import { Router } from "express";
import { askQuestion } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/*
POST /api/chat ->  "query": "How do I jump start a car battery?"
 */
router.post(
    "/",
    authMiddleware,
    askQuestion
);

export default router;
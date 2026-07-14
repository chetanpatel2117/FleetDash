import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check if the backend is running
 *     responses:
 *       200:
 *         description: Backend is healthy
 */
router.get("/health", healthCheck);

export default router;

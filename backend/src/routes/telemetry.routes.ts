import { Router } from "express";
import {
  getTelemetryHistory,
  receiveTelemetry,
} from "../controllers/telemetry.controller";

const router = Router();

router.post("/api/telemetry", receiveTelemetry);
router.get("/api/telemetry/history/:vehicleId", getTelemetryHistory);

/**
 * @swagger
 * /api/telemetry:
 *   post:
 *     tags:
 *       - Telemetry
 *     summary: Receive vehicle telemetry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - latitude
 *               - longitude
 *               - speed
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: truck101
 *               latitude:
 *                 type: number
 *                 example: 18.52
 *               longitude:
 *                 type: number
 *                 example: 73.85
 *               speed:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Telemetry received successfully
 *       400:
 *         description: Invalid telemetry data
 */
router.post("/api/telemetry", receiveTelemetry);

export default router;

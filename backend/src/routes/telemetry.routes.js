"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const telemetry_controller_1 = require("../controllers/telemetry.controller");
const router = (0, express_1.Router)();
router.post("/api/telemetry", telemetry_controller_1.receiveTelemetry);
router.get("/api/telemetry/history/:vehicleId", telemetry_controller_1.getTelemetryHistory);
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
router.post("/api/telemetry", telemetry_controller_1.receiveTelemetry);
exports.default = router;
//# sourceMappingURL=telemetry.routes.js.map
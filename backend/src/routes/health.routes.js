"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controller_1 = require("../controllers/health.controller");
const router = (0, express_1.Router)();
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
router.get("/health", health_controller_1.healthCheck);
exports.default = router;
//# sourceMappingURL=health.routes.js.map
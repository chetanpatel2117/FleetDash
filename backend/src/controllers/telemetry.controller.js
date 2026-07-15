"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTelemetryHistory = exports.receiveTelemetry = void 0;
const telemetry_service_1 = require("../services/telemetry.service");
const telemetryStorage_service_1 = require("../services/telemetryStorage.service");
const receiveTelemetry = async (req, res) => {
    try {
        const result = await (0, telemetry_service_1.processTelemetry)(req.body);
        return res.status(result.statusCode).json(result);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.receiveTelemetry = receiveTelemetry;
const getTelemetryHistory = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const safeVehicleId = typeof vehicleId === "string" ? vehicleId : "";
        if (!safeVehicleId) {
            return res.status(400).json({
                success: false,
                message: "Vehicle ID is required",
            });
        }
        const asString = (value) => {
            if (Array.isArray(value)) {
                return value[0] ? String(value[0]) : undefined;
            }
            return typeof value === "string" ? value : undefined;
        };
        const fromValue = asString(req.query.from);
        const toValue = asString(req.query.to);
        const limitValue = req.query.limit ? Number(asString(req.query.limit) ?? 0) : undefined;
        const history = await (0, telemetryStorage_service_1.getVehicleHistory)(safeVehicleId, {
            ...(fromValue !== undefined ? { from: fromValue } : {}),
            ...(toValue !== undefined ? { to: toValue } : {}),
            ...(limitValue !== undefined ? { limit: limitValue } : {}),
        });
        return res.status(200).json({
            success: true,
            message: "Telemetry history retrieved successfully",
            data: history,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getTelemetryHistory = getTelemetryHistory;
//# sourceMappingURL=telemetry.controller.js.map
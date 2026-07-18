"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTelemetry = void 0;
const telemetryStorage_service_1 = require("./telemetryStorage.service");
const processTelemetry = async (data) => {
    const { vehicleId, latitude, longitude, speed } = data;
    if (!vehicleId ||
        latitude === undefined ||
        longitude === undefined ||
        speed === undefined) {
        return {
            success: false,
            statusCode: 400,
            message: "Missing required telemetry fields",
        };
    }
    if (latitude < -90 || latitude > 90) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid latitude",
        };
    }
    if (longitude < -180 || longitude > 180) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid longitude",
        };
    }
    if (speed < 0) {
        return {
            success: false,
            statusCode: 400,
            message: "Speed cannot be negative",
        };
    }
    // TODO (Developer 2):
    // Send telemetry to Worker Thread
    try {
        await (0, telemetryStorage_service_1.saveTelemetry)(data);
    }
    catch (error) {
        console.error("Telemetry storage failed", error);
        return {
            success: false,
            statusCode: 500,
            message: "Telemetry received but storage failed",
        };
    }
    return {
        success: true,
        statusCode: 200,
        message: "Telemetry received successfully",
        data: {
            vehicleId,
            latitude,
            longitude,
            speed,
        },
    };
};
exports.processTelemetry = processTelemetry;
//# sourceMappingURL=telemetry.service.js.map
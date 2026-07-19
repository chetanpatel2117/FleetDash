"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTelemetry = void 0;
const workerManager_1 = require("../workers/workerManager");
const telemetryStorage_service_1 = require("./telemetryStorage.service");
const geofence_service_1 = require("./geofence.service");
const redisPublisher_1 = require("./redisPublisher");
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
    const workerResult = await (0, workerManager_1.runTelemetryWorker)({
        vehicleId,
        latitude,
        longitude,
        speed,
    });
    if (!workerResult.success) {
        return {
            success: false,
            statusCode: 400,
            message: workerResult.error ||
                workerResult.validation?.errors.join(", ") ||
                "Worker processing failed",
        };
    }
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
    const geofenceResult = (0, geofence_service_1.checkVehicleBoundary)(latitude, longitude);
    await (0, redisPublisher_1.publishVehicleUpdate)(workerResult.data);
    if (workerResult.data && workerResult.data.speed > 80) {
        await (0, redisPublisher_1.publishVehicleAlert)(workerResult.data);
    }
    return {
        success: true,
        statusCode: 200,
        message: "Telemetry received successfully",
        data: {
            ...workerResult.data,
            geofence: geofenceResult,
        },
    };
};
exports.processTelemetry = processTelemetry;
//# sourceMappingURL=telemetry.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleHistory = exports.saveTelemetry = void 0;
const database_1 = require("../database/database");
const telemetryBucket_model_1 = require("../database/telemetryBucket.model");
const saveTelemetry = async (data) => {
    await (0, database_1.connectDatabase)();
    const date = new Date();
    const bucketDate = date.toISOString().slice(0, 10);
    const bucketHour = date.getUTCHours();
    const point = {
        latitude: data.latitude,
        longitude: data.longitude,
        speed: data.speed,
        timestamp: date,
    };
    await telemetryBucket_model_1.TelemetryBucket.updateOne({
        vehicleId: data.vehicleId,
        date: bucketDate,
        hour: bucketHour,
    }, {
        $setOnInsert: {
            vehicleId: data.vehicleId,
            date: bucketDate,
            hour: bucketHour,
        },
        $push: {
            locations: {
                $each: [point],
                $slice: -1000,
            },
        },
    }, { upsert: true });
};
exports.saveTelemetry = saveTelemetry;
const getVehicleHistory = async (vehicleId, options) => {
    await (0, database_1.connectDatabase)();
    const filters = { vehicleId };
    if (options?.from || options?.to) {
        filters.date = {};
        if (options?.from) {
            filters.date.$gte = options.from;
        }
        if (options?.to) {
            filters.date.$lte = options.to;
        }
    }
    const query = telemetryBucket_model_1.TelemetryBucket.find(filters)
        .sort({ date: 1, hour: 1 })
        .lean();
    if (options?.limit) {
        query.limit(options.limit);
    }
    const buckets = await query;
    return buckets.map((bucket) => ({
        vehicleId: bucket.vehicleId,
        date: bucket.date,
        hour: bucket.hour,
        locations: bucket.locations,
    }));
};
exports.getVehicleHistory = getVehicleHistory;
//# sourceMappingURL=telemetryStorage.service.js.map
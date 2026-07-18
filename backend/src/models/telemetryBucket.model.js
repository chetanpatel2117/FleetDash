"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryBucket = void 0;
const mongoose_1 = require("mongoose");
const telemetryPointSchema = new mongoose_1.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
}, { _id: false });
const telemetryBucketSchema = new mongoose_1.Schema({
    vehicleId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    hour: { type: Number, required: true, index: true },
    locations: { type: [telemetryPointSchema], default: [] },
}, {
    timestamps: true,
});
telemetryBucketSchema.index({ vehicleId: 1, date: 1, hour: 1 }, { unique: true });
exports.TelemetryBucket = (0, mongoose_1.model)("TelemetryBucket", telemetryBucketSchema);
//# sourceMappingURL=telemetryBucket.model.js.map
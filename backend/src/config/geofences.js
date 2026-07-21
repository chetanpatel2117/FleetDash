"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryZoneGeofence = exports.warehouseGeofence = void 0;
const turf_1 = require("@turf/turf");
exports.warehouseGeofence = (0, turf_1.polygon)([
    [
        [73.85, 18.52],
        [73.86, 18.52],
        [73.86, 18.53],
        [73.85, 18.53],
        [73.85, 18.52],
    ],
]);
exports.deliveryZoneGeofence = (0, turf_1.polygon)([
    [
        [73.84, 18.51],
        [73.87, 18.51],
        [73.87, 18.54],
        [73.84, 18.54],
        [73.84, 18.51],
    ],
]);
//# sourceMappingURL=geofences.js.map
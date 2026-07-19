"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPointInsideGeofence = isPointInsideGeofence;
exports.checkVehicleBoundary = checkVehicleBoundary;
const turf_1 = require("@turf/turf");
const geofences_1 = require("../config/geofences");
/**
 * Checks whether a coordinate is inside a given geofence polygon.
 *
 * Turf uses coordinates in this order:
 * [longitude, latitude]
 */
function isPointInsideGeofence(latitude, longitude, geofence) {
    const vehicleLocation = (0, turf_1.point)([longitude, latitude]);
    return (0, turf_1.booleanPointInPolygon)(vehicleLocation, geofence);
}
/**
 * Checks which configured zone contains the vehicle.
 */
function checkVehicleBoundary(latitude, longitude) {
    if (isPointInsideGeofence(latitude, longitude, geofences_1.warehouseGeofence)) {
        return {
            inside: true,
            zone: "Warehouse",
        };
    }
    if (isPointInsideGeofence(latitude, longitude, geofences_1.deliveryZoneGeofence)) {
        return {
            inside: true,
            zone: "Delivery Zone",
        };
    }
    return {
        inside: false,
        zone: null,
    };
}
//# sourceMappingURL=geofence.service.js.map
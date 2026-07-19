import { booleanPointInPolygon, point } from "@turf/turf";
import { deliveryZoneGeofence, warehouseGeofence } from "../config/geofences";
import { GeofenceResult } from "../interfaces/geofence.interface";

/**
 * Checks whether a coordinate is inside a given geofence polygon.
 *
 * Turf uses coordinates in this order:
 * [longitude, latitude]
 */
export function isPointInsideGeofence(
  latitude: number,
  longitude: number,
  geofence: typeof warehouseGeofence,
): boolean {
  const vehicleLocation = point([longitude, latitude]);

  return booleanPointInPolygon(vehicleLocation, geofence);
}

/**
 * Checks which configured zone contains the vehicle.
 */
export function checkVehicleBoundary(
  latitude: number,
  longitude: number,
): GeofenceResult {
  if (isPointInsideGeofence(latitude, longitude, warehouseGeofence)) {
    return {
      inside: true,
      zone: "Warehouse",
    };
  }

  if (isPointInsideGeofence(latitude, longitude, deliveryZoneGeofence)) {
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

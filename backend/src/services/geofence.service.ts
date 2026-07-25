import { point, booleanPointInPolygon } from "@turf/turf";
import { warehouseGeofence, deliveryZoneGeofence } from "../config/geofences";

function isPointInsideGeofence(latitude: number, longitude: number, geofence: any) {
  const vehicleLocation = point([longitude, latitude]);
  return booleanPointInPolygon(vehicleLocation, geofence);
}

export function checkVehicleBoundary(latitude: number, longitude: number) {
  if (isPointInsideGeofence(latitude, longitude, warehouseGeofence)) {
    return { inside: true, zone: "Warehouse" };
  }

  if (isPointInsideGeofence(latitude, longitude, deliveryZoneGeofence)) {
    return { inside: true, zone: "Delivery Zone" };
  }

  return { inside: false, zone: null };
}

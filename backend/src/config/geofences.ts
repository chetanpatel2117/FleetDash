import { polygon } from "@turf/turf";

export const warehouseGeofence = polygon([
  [
    [73.85, 18.52],
    [73.86, 18.52],
    [73.86, 18.53],
    [73.85, 18.53],
    [73.85, 18.52],
  ],
]);

export const deliveryZoneGeofence = polygon([
  [
    [73.84, 18.51],
    [73.87, 18.51],
    [73.87, 18.54],
    [73.84, 18.54],
    [73.84, 18.51],
  ],
]);

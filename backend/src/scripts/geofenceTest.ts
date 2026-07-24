import { checkVehicleBoundary } from "../services/geofence.service";

const testLocations = [
  {
    name: "Inside Warehouse",
    latitude: 18.525,
    longitude: 73.855,
  },
  {
    name: "Inside Delivery Zone",
    latitude: 18.535,
    longitude: 73.865,
  },
  {
    name: "Outside All Zones",
    latitude: 18.6,
    longitude: 73.9,
  },
];

for (const location of testLocations) {
  const result = checkVehicleBoundary(location.latitude, location.longitude);

  console.log(location.name, result);
}

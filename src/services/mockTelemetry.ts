import type { Vehicle } from "../types/vehicle";

export const mockVehicles: Vehicle[] = [
  {
    id: "TRK-101",
    name: "Truck 101",
    latitude: 11.0168,
    longitude: 76.9558,
    speed: 62,
    heading: 90,
    status: "moving",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "TRK-102",
    name: "Truck 102",
    latitude: 11.0250,
    longitude: 76.9600,
    speed: 48,
    heading: 180,
    status: "moving",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "TRK-103",
    name: "Truck 103",
    latitude: 11.0100,
    longitude: 76.9480,
    speed: 0,
    heading: 0,
    status: "idle",
    lastUpdated: new Date().toISOString(),
  },
];

export function generateVehicleUpdates() {
  return mockVehicles.map((vehicle) => ({
    ...vehicle,

    latitude: vehicle.latitude + (Math.random() - 0.5) * 0.002,

    longitude: vehicle.longitude + (Math.random() - 0.5) * 0.002,

    speed: Math.max(
      0,
      Math.floor(vehicle.speed + (Math.random() * 10 - 5))
    ),

status: (Math.random() > 0.8 ? "idle" : "moving") as Vehicle["status"],
    lastUpdated: new Date().toISOString(),
  }));
}
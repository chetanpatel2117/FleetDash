import type { Vehicle } from "../types/vehicle";

export function generateVehicles(count: number): Vehicle[] {

  const vehicles: Vehicle[] = [];

  const statuses: Vehicle["status"][] = [
    "moving",
    "idle",
    "offline",
  ];

  for (let i = 0; i < count; i++) {

    vehicles.push({
      id: `vehicle-${i}`,
      name: `Truck-${i}`,

      latitude: 11 + Math.random() * 0.2,
      longitude: 76 + Math.random() * 0.2,

      speed: Math.floor(Math.random() * 100),

      status:
        statuses[
          Math.floor(Math.random() * statuses.length)
        ],

      updatedAt: new Date(),
    });
  }

  return vehicles;
}
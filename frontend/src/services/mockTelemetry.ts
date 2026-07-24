import type { Vehicle } from "../types/vehicle";
import { generateVehicleMetadata } from "./vehicleMetadata";


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

  ...generateVehicleMetadata(),
  },

  {
  id: "TRK-102",
  name: "Truck 102",
  latitude: 11.025,
  longitude: 76.96,
  speed: 48,
  heading: 180,
  status: "moving",
  lastUpdated: new Date().toISOString(),

  ...generateVehicleMetadata(),
},
  {
  id: "TRK-103",
  name: "Truck 103",
  latitude: 11.01,
  longitude: 76.948,
  speed: 0,
  heading: 270,
  status: "idle",
  lastUpdated: new Date().toISOString(),

  ...generateVehicleMetadata(),
},
];

export function generateVehicleUpdates(
  vehicles: Vehicle[]
): Vehicle[] {
  return vehicles.map((vehicle) => {
    // Offline vehicles never move
    if (vehicle.status === "offline") {
      return {
        ...vehicle,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Idle vehicles remain almost stationary
    if (vehicle.status === "idle") {
      return {
        ...vehicle,
        speed: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Small heading change (-5° to +5°)
    const heading =
      (vehicle.heading + (Math.random() * 10 - 5) + 360) % 360;

    // Gradual speed variation
    const speed = Math.min(
      100,
      Math.max(20, vehicle.speed + (Math.random() * 6 - 3))
    );

    // Convert heading to radians
    const radians = (heading * Math.PI) / 180;

    // Movement distance (tune this value if needed)
    const distance = speed * 0.00001;

    const latitude =
      vehicle.latitude + Math.cos(radians) * distance;

    const longitude =
      vehicle.longitude + Math.sin(radians) * distance;

    // Occasionally change state
    let status: Vehicle["status"] = "moving";

    const random = Math.random();

    if (random < 0.05) {
      status = "offline";
    } else if (random < 0.15) {
      status = "idle";
    }

    return {
      ...vehicle,
      latitude,
      longitude,
      heading,
      speed: Math.round(speed),
      status,
      lastUpdated: new Date().toISOString(),
    };
  });
}
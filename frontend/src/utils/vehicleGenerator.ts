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
      heading: Math.floor(Math.random() * 360),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastUpdated: new Date().toISOString(),
      driverName: `Driver ${i}`,
      vehicleType: i % 2 === 0 ? "Truck" : "Van",
      fuelLevel: Math.floor(Math.random() * 100),
      batteryLevel: Math.floor(Math.random() * 100),
      signalStrength: Math.floor(Math.random() * 100),
      gpsAccuracy: 2 + Math.floor(Math.random() * 20),
      ignitionStatus: i % 2 === 0 ? "ON" : "OFF",
      healthStatus: i % 3 === 0 ? "Good" : i % 3 === 1 ? "Warning" : "Critical",
      assignedRoute: `Route ${i % 5 + 1}`,
      destination: `Stop ${i % 10 + 1}`,
      eta: `${5 + (i % 15)} min`,
    });
  }

  return vehicles;
}
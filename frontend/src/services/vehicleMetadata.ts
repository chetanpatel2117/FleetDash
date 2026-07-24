import type { Vehicle } from "../types/vehicle";


export function generateVehicleMetadata(): Pick<
  Vehicle,
  | "driverName"
  | "vehicleType"
  | "fuelLevel"
  | "batteryLevel"
  | "signalStrength"
  | "gpsAccuracy"
  | "ignitionStatus"
  | "healthStatus"
  | "assignedRoute"
  | "destination"
  | "eta"
> {
  const drivers = [
    "Arun Kumar",
    "Rahul Sharma",
    "Priya Singh",
    "Vikram Patel"
  ];


  const routes = [
    "Coimbatore → Chennai",
    "Pune → Mumbai",
    "Delhi → Jaipur",
    "Hyderabad → Bangalore"
  ];


  return {

    driverName:
      drivers[
        Math.floor(
          Math.random() * drivers.length
        )
      ],


    vehicleType:
      "Truck",


    fuelLevel:
      Math.floor(Math.random() * 100),


    batteryLevel:
      Math.floor(Math.random() * 100),


    signalStrength:
      Math.floor(Math.random() * 100),


    gpsAccuracy:
      Number(
        (Math.random() * 5).toFixed(2)
      ),


    ignitionStatus:
      Math.random() > 0.3
        ? "ON"
        : "OFF",


    healthStatus:
      Math.random() > 0.85
        ? "Warning"
        : "Good",


    assignedRoute:
      routes[
        Math.floor(
          Math.random() * routes.length
        )
      ],


    destination:
      "Main Warehouse",


    eta:
      `${Math.floor(Math.random()*60)+5} mins`

  };
}
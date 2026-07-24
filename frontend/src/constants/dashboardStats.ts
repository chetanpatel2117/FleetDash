import { Truck, Activity, CirclePause, WifiOff } from "lucide-react";
import type { Vehicle } from "../types/vehicle";

export const getDashboardStats = (vehicles: Vehicle[]) => [
  {
    title: "Active Vehicles",
    value: vehicles.length.toString(),
    icon: Truck,
  },
  {
    title: "Moving Vehicles",
    value: vehicles
      .filter(vehicle => vehicle.status === "moving")
      .length.toString(),
    icon: Activity,
  },
  {
    title: "Idle Vehicles",
    value: vehicles
      .filter(vehicle => vehicle.status === "idle")
      .length.toString(),
    icon: CirclePause,
  },
  {
    title: "Offline Vehicles",
    value: vehicles
      .filter(vehicle => vehicle.status === "offline")
      .length.toString(),
    icon: WifiOff,
  },
];
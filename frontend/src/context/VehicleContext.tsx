import { createContext, useContext } from "react";
import type { Vehicle } from "../types/vehicle";

export interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VehicleContext = createContext<VehicleContextType | undefined>(
  undefined,
);

export function useVehicleContext() {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error("useVehicleContext must be used inside VehicleProvider");
  }

  return context;
}

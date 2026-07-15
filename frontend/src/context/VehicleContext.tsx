import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";
import { createContext, useContext, useState, useEffect } from "react";

import { mockVehicles, generateVehicleUpdates } from "../services/mockTelemetry";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;

  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

interface VehicleProviderProps {
  children: ReactNode;
}

function VehicleProvider ({ children }: VehicleProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(currentVehicles => generateVehicleUpdates(currentVehicles));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,

        selectedVehicle,
        setSelectedVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleContext () {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error("useVehicleContext must be used inside VehicleProvider");
  }

  return context;
}

export { VehicleProvider };

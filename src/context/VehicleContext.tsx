import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";
import { useEffect } from "react";
import { mockVehicles, generateVehicleUpdates } from "../services/mockTelemetry";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

interface VehicleProviderProps {
  children: ReactNode;
}

function VehicleProvider ({ children }: VehicleProviderProps) {
  const [vehicles, setVehicles] = useState(mockVehicles);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(generateVehicleUpdates());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
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

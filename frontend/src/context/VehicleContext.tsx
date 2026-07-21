import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { mockVehicles, generateVehicleUpdates } from "../services/mockTelemetry";
import { useVehicleStream } from "../hooks/useVehicleStream";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;

  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;

  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

interface VehicleProviderProps {
  children: ReactNode;
}

function VehicleProvider ({ children }: VehicleProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [connected, setConnected] = useState(false);

  const USE_MOCK_TELEMETRY = true;

  useVehicleStream({
    onVehicleUpdate: setVehicles,
    onConnectionChange: setConnected,
  });

  useEffect(() => {
    if (!USE_MOCK_TELEMETRY) return;

    const interval = setInterval(() => {
      setVehicles(currentVehicles => generateVehicleUpdates(currentVehicles));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const value = useMemo(
    () => ({
      vehicles,
      setVehicles,
      selectedVehicle,
      setSelectedVehicle,
      connected,
      setConnected,
    }),
    [connected, selectedVehicle, vehicles]
  );

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useVehicleContext () {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error("useVehicleContext must be used inside VehicleProvider");
  }

  return context;
}

export { VehicleProvider };

import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";

import { createContext, useContext, useState, useEffect } from "react";

import { mockVehicles } from "../services/mockTelemetry";

import { useVehicleStream } from "../hooks/useVehicleStream";

import { updateVehicles } from "../store/vehicleStore";

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
  // Initial data before socket connection

  const ENABLE_SOCKET = true;
const initialVehicles = ENABLE_SOCKET ? [] : mockVehicles;

  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [connected, setConnected] = useState(false);

  /*
    Socket.io telemetry listener

    Backend emits:

    "telemetry:update"

    Payload:

    Vehicle[]
  */
  

  useVehicleStream({
    onVehicleUpdate: setVehicles,

    onConnectionChange: setConnected,
  });

  /*
    Sync React state with external vehicle store.

    Canvas renderer reads directly
    from vehicleStore.
  */
  useEffect(() => {
    updateVehicles(vehicles);
  }, [vehicles]);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,

        setVehicles,

        selectedVehicle,

        setSelectedVehicle,

        connected,

        setConnected,
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

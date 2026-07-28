import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";

import { VehicleContext } from "./VehicleContext";
import { mockVehicles } from "../services/mockTelemetry";
import { useVehicleStream } from "../hooks/useVehicleStream";
import { updateVehicles } from "../store/vehicleStore";

interface VehicleProviderProps {
  children: ReactNode;
}

export function VehicleProvider({ children }: VehicleProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [connected, setConnected] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState("all");

  useVehicleStream({
    onVehicleUpdate: setVehicles,
    onConnectionChange: setConnected,
  });

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
        dashboardSearch,
        setDashboardSearch,
        dashboardStatusFilter,
        setDashboardStatusFilter,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

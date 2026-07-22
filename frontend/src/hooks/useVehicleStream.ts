import { useEffect } from "react";
import socket from "../services/socket";
import type { Vehicle } from "../types/vehicle";
import { updateVehicles } from "../store/vehicleStore";

interface UseVehicleStreamProps {
  onVehicleUpdate: (vehicles: Vehicle[]) => void;
  onConnectionChange?: (connected: boolean) => void;
}

export function useVehicleStream({
  onVehicleUpdate,
  onConnectionChange,
}: UseVehicleStreamProps) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      onConnectionChange?.(true);
    };

    const handleDisconnect = () => {
      onConnectionChange?.(false);
    };

    const handleTelemetry = (incomingVehicles: Vehicle[]) => {
      onVehicleUpdate(incomingVehicles);
      updateVehicles(incomingVehicles);
    };

    socket.on("telemetry:update", handleTelemetry);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("telemetry:update", handleTelemetry);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      socket.disconnect();
    };
  }, [onVehicleUpdate, onConnectionChange]);
}
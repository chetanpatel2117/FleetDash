import { useEffect } from "react";
import socket from "../services/socket";
import type { Vehicle } from "../types/vehicle";

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
      console.log("✅ Socket Connected");
      onConnectionChange?.(true);
    };

    const handleDisconnect = () => {
      console.log("❌ Socket Disconnected");
      onConnectionChange?.(false);
    };

    const handleTelemetry = (vehicles: Vehicle[]) => {
      onVehicleUpdate(vehicles);
    };

    // Placeholder event name
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
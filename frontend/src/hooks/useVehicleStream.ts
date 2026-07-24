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
    console.log("Socket Connected");
    onConnectionChange?.(true);
  };

  const handleDisconnect = () => {
    console.log("Socket Disconnected");
    onConnectionChange?.(false);
  };

  const handleTelemetry = (vehicles: Vehicle[]) => {
    updateVehicles(vehicles);
    onVehicleUpdate(vehicles);
  };

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);
  socket.on("telemetry:update", handleTelemetry);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
    socket.off("telemetry:update", handleTelemetry);
  };
}, [onVehicleUpdate, onConnectionChange]);

}
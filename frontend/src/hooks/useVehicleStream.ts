import { useEffect } from "react";
import socket from "../services/socket";
import type { Vehicle } from "../types/vehicle";
import { updateVehicles } from "../store/vehicleStore";
import { info } from "../utils/toast";
import type { VehicleAlert } from "../types/alert";

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

  const handleTelemetry = (payload: Vehicle | Vehicle[]) => {
    const nextVehicles = Array.isArray(payload) ? payload : [payload];

    updateVehicles(nextVehicles);
    onVehicleUpdate(nextVehicles);
  };

  const handleGeofenceAlert = (alert: VehicleAlert | { vehicleId: string; message?: string }) => {
    const alertMessage = alert.message ?? `Vehicle ${alert.vehicleId ?? "unknown"} triggered a geofence event`;
    info(alertMessage);
  };

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);
  socket.on("telemetry:update", handleTelemetry);
  socket.on("geofence:entry", handleGeofenceAlert);
  socket.on("geofence:breach", handleGeofenceAlert);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
    socket.off("telemetry:update", handleTelemetry);
    socket.off("geofence:entry", handleGeofenceAlert);
    socket.off("geofence:breach", handleGeofenceAlert);
  };
}, [onVehicleUpdate, onConnectionChange]);

}
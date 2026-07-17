import { useEffect, useState } from "react";
import socket from "../services/socket";
import type { Vehicle } from "../types/vehicle";

export function useTelemetry() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect only if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("✅ Connected to telemetry server");
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("❌ Disconnected from telemetry server");
      setConnected(false);
    };

    const handleTelemetry = (data: Vehicle[]) => {
      setVehicles(data);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("telemetry", handleTelemetry);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("telemetry", handleTelemetry);

      socket.disconnect();
    };
  }, []);

  return {
    vehicles,
    connected,
  };
}
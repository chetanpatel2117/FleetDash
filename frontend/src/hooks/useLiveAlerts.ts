import { useEffect, useState } from "react";
import type { VehicleAlert } from "../types/alert";
import socket from "../services/socket";

export function useLiveAlerts() {
  const [alerts, setAlerts] = useState<VehicleAlert[]>([]);

  useEffect(() => {
    const handleGeofenceAlert = (alert: VehicleAlert) => {
      setAlerts((current) => [
        {
          ...alert,
          id: `${alert.vehicleId}-${alert.timestamp}`,
          resolved: false,
        },
        ...current,
      ].slice(0, 8));
    };

    socket.on("geofence:entry", handleGeofenceAlert);
    socket.on("geofence:breach", handleGeofenceAlert);

    return () => {
      socket.off("geofence:entry", handleGeofenceAlert);
      socket.off("geofence:breach", handleGeofenceAlert);
    };
  }, []);

  return alerts;
}

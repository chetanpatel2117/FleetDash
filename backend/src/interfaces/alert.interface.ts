export interface GeofenceAlert {
  vehicleId: string;
  event: "geofence:entry" | "geofence:breach";
  latitude: number;
  longitude: number;
  timestamp: Date;
}
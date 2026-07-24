export interface Vehicle {

  id: string;

  name: string;

  latitude: number;

  longitude: number;

  speed: number;

  heading: number;

  status: "moving" | "idle" | "offline";

  lastUpdated: string;


  // Vehicle metadata
  driverName: string;

  vehicleType: string;

  fuelLevel: number;

  batteryLevel: number;

  signalStrength: number;

  gpsAccuracy: number;

  ignitionStatus: "ON" | "OFF";

  healthStatus: "Good" | "Warning" | "Critical";

  assignedRoute: string;

  destination: string;

  eta: string;
}
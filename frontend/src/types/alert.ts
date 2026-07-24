export interface Alert {
  id: number;
  vehicle: string;
  message: string;
  severity: "High" | "Medium" | "Low";
  timestamp: string;
}


export type AlertSeverity =
  | "critical"
  | "warning"
  | "info";


export type AlertType =
  | "overspeed"
  | "low_fuel"
  | "low_battery"
  | "offline"
  | "gps_issue"
  | "health_issue";


export interface VehicleAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: number;
  resolved: boolean;
}
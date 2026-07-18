export interface Alert {
  id: number;
  vehicle: string;
  message: string;
  severity: "High" | "Medium" | "Low";
  timestamp: string;
}
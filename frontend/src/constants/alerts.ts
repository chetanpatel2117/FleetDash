import type { Alert } from "../types/alert";

export const mockAlerts: Alert[] = [
  {
    id: 1,
    vehicle: "Truck-102",
    message: "Entered restricted zone",
    severity: "High",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    vehicle: "Truck-208",
    message: "Overspeed detected",
    severity: "Medium",
    timestamp: "5 min ago",
  },
  {
    id: 3,
    vehicle: "Truck-054",
    message: "Engine idle too long",
    severity: "Low",
    timestamp: "8 min ago",
  },
];
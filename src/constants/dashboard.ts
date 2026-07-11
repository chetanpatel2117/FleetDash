import {
  Truck,
  TriangleAlert,
  Gauge,
  MapPinned,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Active Vehicles",
    value: "156",
    icon: Truck,
  },
  {
    title: "Active Alerts",
    value: "12",
    icon: TriangleAlert,
  },
  {
    title: "Average Speed",
    value: "68 km/h",
    icon: Gauge,
  },
  {
    title: "Geofence Zones",
    value: "24",
    icon: MapPinned,
  },
];
import type { VehicleAlert } from "../types/alert";
import type { Vehicle } from "../types/vehicle";


export function generateAlerts(
  vehicles: Vehicle[]
): VehicleAlert[] {

  const alerts: VehicleAlert[] = [];


  vehicles.forEach((vehicle) => {


    // Speed Alert
    if (vehicle.speed > 90) {

      alerts.push({
        id: `speed-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "overspeed",
        severity: "critical",
        message: `Speed exceeded limit (${vehicle.speed} km/h)`,
        timestamp: Date.now(),
        resolved: false,
      });

    }


    // Offline Alert
    if (vehicle.status === "offline") {

      alerts.push({
        id: `offline-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "offline",
        severity: "warning",
        message: "Vehicle is offline",
        timestamp: Date.now(),
        resolved: false,
      });

    }


    // Low Fuel Alert
    if (vehicle.fuelLevel < 20) {

      alerts.push({
        id: `fuel-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "low_fuel",
        severity: "warning",
        message: `Fuel level is low (${vehicle.fuelLevel}%)`,
        timestamp: Date.now(),
        resolved: false,
      });

    }


    // Low Battery Alert
    if (vehicle.batteryLevel < 20) {

      alerts.push({
        id: `battery-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "low_battery",
        severity: "warning",
        message: `Battery level is low (${vehicle.batteryLevel}%)`,
        timestamp: Date.now(),
        resolved: false,
      });

    }


    // GPS Issue Alert
    if (vehicle.gpsAccuracy > 50) {

      alerts.push({
        id: `gps-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "gps_issue",
        severity: "info",
        message: `Poor GPS accuracy (${vehicle.gpsAccuracy}m)`,
        timestamp: Date.now(),
        resolved: false,
      });

    }


    // Health Issue Alert
    if (vehicle.healthStatus === "Critical") {

      alerts.push({
        id: `health-${vehicle.id}`,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: "health_issue",
        severity: "critical",
        message: "Vehicle health requires attention",
        timestamp: Date.now(),
        resolved: false,
      });

    }


  });


  return alerts;

}
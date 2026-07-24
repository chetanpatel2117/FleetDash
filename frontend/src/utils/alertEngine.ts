import type { Vehicle } from "../types/vehicle";
import type { VehicleAlert } from "../types/alert";


export function generateAlerts(
  vehicles: Vehicle[]
): VehicleAlert[] {

  const alerts: VehicleAlert[] = [];


  vehicles.forEach((vehicle) => {


    // Overspeed Alert
    if (vehicle.speed > 100) {

      alerts.push({
        id: `${vehicle.id}-speed`,
        vehicleId: vehicle.id,
        type: "overspeed",
        severity: "warning",
        message:
          `${vehicle.name} exceeded speed limit (${vehicle.speed} km/h)`,
        timestamp: Date.now(),
      });

    }



    // Low Fuel Alert
    if (vehicle.fuelLevel < 20) {

      alerts.push({
        id: `${vehicle.id}-fuel`,
        vehicleId: vehicle.id,
        type: "low_fuel",
        severity: "warning",
        message:
          `${vehicle.name} fuel level is low (${vehicle.fuelLevel}%)`,
        timestamp: Date.now(),
      });

    }



    // Low Battery Alert
    if (vehicle.batteryLevel < 20) {

      alerts.push({
        id: `${vehicle.id}-battery`,
        vehicleId: vehicle.id,
        type: "low_battery",
        severity: "critical",
        message:
          `${vehicle.name} battery level is low (${vehicle.batteryLevel}%)`,
        timestamp: Date.now(),
      });

    }



    // Offline Vehicle Alert
    if (vehicle.status === "offline") {

      alerts.push({
        id: `${vehicle.id}-offline`,
        vehicleId: vehicle.id,
        type: "offline",
        severity: "critical",
        message:
          `${vehicle.name} is offline`,
        timestamp: Date.now(),
      });

    }



    // GPS Accuracy Alert
    if (vehicle.gpsAccuracy > 20) {

      alerts.push({
        id: `${vehicle.id}-gps`,
        vehicleId: vehicle.id,
        type: "gps_issue",
        severity: "warning",
        message:
          `${vehicle.name} GPS accuracy degraded`,
        timestamp: Date.now(),
      });

    }



    // Signal Strength Alert
    if (vehicle.signalStrength < 30) {

      alerts.push({
        id: `${vehicle.id}-signal`,
        vehicleId: vehicle.id,
        type: "gps_issue",
        severity: "warning",
        message:
          `${vehicle.name} signal strength weak`,
        timestamp: Date.now(),
      });

    }



    // Vehicle Health Alert
    if (vehicle.healthStatus !== "Good") {

      alerts.push({
        id: `${vehicle.id}-health`,
        vehicleId: vehicle.id,
        type: "health_issue",
        severity:
          vehicle.healthStatus === "Critical"
            ? "critical"
            : "warning",
        message:
          `${vehicle.name} health status: ${vehicle.healthStatus}`,
        timestamp: Date.now(),
      });

    }


  });


  return alerts;
}
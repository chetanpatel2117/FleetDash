import type { TelemetryData } from "../interfaces/telemetry.interface";
import type { ApiResponse } from "../interfaces/apiResponse.interface";
import { saveTelemetry } from "./telemetryStorage.service";
import { runTelemetryWorker } from "../workers";
import { checkVehicleBoundary } from "./geofence.service";
import { publishVehicleUpdate, publishVehicleAlert } from "./redisPublisher";
import { publishGeofenceAlert } from "./geofencePublisher.service";
import { getIO } from "../socket/socket";
import { AlertService } from "./alert.service";

const alertService = new AlertService();

export const processTelemetry = async (data: TelemetryData): Promise<ApiResponse> => {
  const { vehicleId, latitude, longitude, speed } = data;

  // Validation
  if (
    !vehicleId ||
    latitude === undefined ||
    longitude === undefined ||
    speed === undefined
  ) {
    return {
      success: false,
      statusCode: 400,
      message: "Missing required telemetry fields",
    };
  }

  if (latitude < -90 || latitude > 90) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid latitude",
    };
  }

  if (longitude < -180 || longitude > 180) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid longitude",
    };
  }

  if (speed < 0) {
    return {
      success: false,
      statusCode: 400,
      message: "Speed cannot be negative",
    };
  }

  // Process telemetry in worker
  const workerResult = await runTelemetryWorker({
    vehicleId,
    latitude,
    longitude,
    speed,
  });

  if (!workerResult.success || !workerResult.data) {
    return {
      success: false,
      statusCode: 400,
      message:
        workerResult.error ||
        workerResult.validation?.errors.join(", ") ||
        "Worker processing failed",
    };
  }

  // Save telemetry (best-effort; continue processing even if persistence fails)
  try {
    await saveTelemetry(data);
  } catch (error) {
    console.error("Telemetry storage failed", error);
  }

  const geofenceResult = checkVehicleBoundary(latitude, longitude);
  const geofenceAlert = alertService.checkGeofenceState(
    vehicleId,
    geofenceResult.inside,
    latitude,
    longitude
  );

  if (geofenceAlert) {
    try {
      const io = getIO();
      io.emit(geofenceAlert.event, geofenceAlert);
    } catch (socketError) {
      console.warn("Failed to emit geofence alert over Socket.io", socketError);
    }

    try {
      await publishGeofenceAlert(geofenceAlert);
    } catch (error) {
      console.warn("Failed to publish geofence alert", error);
    }
  }

  // Emit telemetry through Socket.IO
  try {
    const io = getIO();

    io.emit("telemetry:update", {
      id: vehicleId,
      vehicleId,
      name: `Vehicle ${vehicleId}`,
      latitude,
      longitude,
      speed,
      heading: data.heading ?? 0,
      status: data.status ?? "moving",
      lastUpdated: new Date().toISOString(),
      driverName: "Fleet Driver",
      vehicleType: "Truck",
      fuelLevel: 100,
      batteryLevel: 100,
      signalStrength: 100,
      gpsAccuracy: 2,
      ignitionStatus: "ON",
      healthStatus: "Good",
      assignedRoute: "Live Route",
      destination: "Warehouse",
      eta: "Now",
    });
  } catch (socketError) {
    console.warn("Failed to emit telemetry over Socket.io", socketError);
  }

  // Publish telemetry update
  try {
    await publishVehicleUpdate(workerResult.data);
  } catch (error) {
    console.warn("Failed to publish vehicle update", error);
  }

  // Publish alert if overspeed
  if (workerResult.data && workerResult.data.speed > 80) {
    try {
      await publishVehicleAlert(workerResult.data);
    } catch (error) {
      console.warn("Failed to publish vehicle alert", error);
    }
  }

  return {
    success: true,
    statusCode: 200,
    message: "Telemetry received successfully",
    data: {
      ...workerResult.data,
      geofence: geofenceResult,
    },
  };
};
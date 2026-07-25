import type { TelemetryData } from "../interfaces/telemetry.interface";
import type { ApiResponse } from "../interfaces/apiResponse.interface";
import { saveTelemetry } from "./telemetryStorage.service";
import { runTelemetryWorker } from "../workers";
import { checkVehicleBoundary } from "./geofence.service";
import { publishVehicleUpdate, publishVehicleAlert } from "./redisPublisher";

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

  // Save telemetry
  try {
    await saveTelemetry(data);
  } catch (error) {
    console.error("Telemetry storage failed", error);

    return {
      success: false,
      statusCode: 500,
      message: "Telemetry received but storage failed",
    };
  }

  const geofenceResult = checkVehicleBoundary(latitude, longitude);

  // Emit telemetry through Socket.IO
  try {
    const { io } = await import("../socket");

    io?.emit("telemetry", {
      vehicleId,
      latitude,
      longitude,
      speed,
      heading: data.heading,
      status: data.status,
      timestamp: new Date().toISOString(),
    });
  } catch (socketError) {
    console.warn("Failed to emit telemetry over Socket.io", socketError);
  }

  // Publish telemetry update
  await publishVehicleUpdate(workerResult.data);

  // Publish alert if overspeed
  if (workerResult.data && workerResult.data.speed > 80) {
    await publishVehicleAlert(workerResult.data);
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
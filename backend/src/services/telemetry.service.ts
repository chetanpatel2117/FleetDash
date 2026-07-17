import { TelemetryData } from "../interfaces/telemetry.interface";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { runTelemetryWorker } from "../workers";
import { publishVehicleUpdate, publishVehicleAlert } from "./redisPublisher";

export const processTelemetry = async (
  data: TelemetryData,
): Promise<ApiResponse> => {
  const { vehicleId, latitude, longitude, speed } = data;

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

  const workerResult = await runTelemetryWorker({
    vehicleId,
    latitude,
    longitude,
    speed,
  });

  if (!workerResult.success) {
    return {
      success: false,
      statusCode: 400,
      message:
        workerResult.error ||
        workerResult.validation?.errors.join(", ") ||
        "Worker processing failed",
    };
  }

  // TODO (Developer 3):
  // Save telemetry to MongoDB Bucket Pattern

  await publishVehicleUpdate(workerResult.data);

  // Publish alert if overspeed
  if (workerResult.data && workerResult.data.speed > 80) {
    await publishVehicleAlert(workerResult.data);
  }

  return {
    success: true,
    statusCode: 200,
    message: "Telemetry received successfully",
    data: workerResult.data,
  };
};

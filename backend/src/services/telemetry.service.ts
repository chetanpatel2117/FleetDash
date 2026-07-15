import { TelemetryData } from "../interfaces/telemetry.interface";

import { ApiResponse } from "../interfaces/apiResponse.interface";

export const processTelemetry = (data: TelemetryData): ApiResponse => {
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

  // TODO (Developer 2):
  // Send telemetry to Worker Thread

  // TODO (Developer 3):
  // Save telemetry to MongoDB Bucket Pattern

  return {
    success: true,
    statusCode: 200,
    message: "Telemetry received successfully",
    data: {
      vehicleId,
      latitude,
      longitude,
      speed,
    },
  };
};

import {
  WorkerTelemetryData,
  ProcessedTelemetry,
} from "./workerTypes";

export function processTelemetryData(
  data: WorkerTelemetryData
): ProcessedTelemetry {
  let speedCategory: "SLOW" | "NORMAL" | "FAST";

  if (data.speed <= 30) {
    speedCategory = "SLOW";
  } else if (data.speed <= 80) {
    speedCategory = "NORMAL";
  } else {
    speedCategory = "FAST";
  }

  return {
    vehicleId: data.vehicleId,
    latitude: data.latitude,
    longitude: data.longitude,
    speed: data.speed,
    speedCategory,
    processedAt: new Date().toISOString(),
  };
}
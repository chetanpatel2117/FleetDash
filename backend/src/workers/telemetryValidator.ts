import {
  WorkerTelemetryData,
  ValidationResult,
} from "./workerTypes";

export function validateTelemetry(
  data: WorkerTelemetryData
): ValidationResult {

  const errors: string[] = [];

  if (!data.vehicleId) {
    errors.push("Vehicle ID is required");
  }

  if (data.latitude < -90 || data.latitude > 90) {
    errors.push("Invalid latitude");
  }

  if (data.longitude < -180 || data.longitude > 180) {
    errors.push("Invalid longitude");
  }

  if (data.speed < 0) {
    errors.push("Speed cannot be negative");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
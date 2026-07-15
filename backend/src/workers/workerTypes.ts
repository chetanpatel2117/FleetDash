/**
 * Incoming telemetry data received from the API.
 */
export interface WorkerTelemetryData {
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp?: number;
}

/**
 * Result of telemetry validation.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Processed telemetry returned by the worker.
 */
export interface ProcessedTelemetry {
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  speedCategory: "SLOW" | "NORMAL" | "FAST";
  processedAt: string;
}

/**
 * Standard response returned from the worker.
 */
export interface WorkerResponse {
  success: boolean;
  data?: ProcessedTelemetry;
  validation?: ValidationResult;
  processingTime: number;
  error?: string;
}
import { parentPort } from "worker_threads";
import { processTelemetryData } from "./telemetryProcessor";
import { validateTelemetry } from "./telemetryValidator";
import {
  WorkerTelemetryData,
  WorkerResponse,
} from "./workerTypes";

parentPort?.on("message", (data: WorkerTelemetryData) => {


  const startTime = Date.now();

  try {
    const validation = validateTelemetry(data);

    if (!validation.isValid) {
      const response: WorkerResponse = {
        success: false,
        validation,
        processingTime: Date.now() - startTime,
      };

      parentPort?.postMessage(response);
      return;
    }

    const processedData = processTelemetryData(data);



    const response: WorkerResponse = {
      success: true,
      data: processedData,
      validation,
      processingTime: Date.now() - startTime,
    };

    parentPort?.postMessage(response);

  } catch (error) {
    const response: WorkerResponse = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown worker error",
      processingTime: Date.now() - startTime,
    };

    parentPort?.postMessage(response);
  }
});
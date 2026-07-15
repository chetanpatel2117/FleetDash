import { Worker } from "worker_threads";
import path from "path";
import { WorkerTelemetryData, WorkerResponse } from "./workerTypes";

export function runTelemetryWorker(
  data: WorkerTelemetryData
): Promise<WorkerResponse> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.resolve(__dirname, "telemetry.worker.js")
    );

    worker.postMessage(data);

    worker.on("message", (result: WorkerResponse) => {
         console.log("Worker Manager received:", result);
      resolve(result);
      worker.terminate();
    });

    worker.on("error", (error) => {
      reject(error);
      worker.terminate();
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
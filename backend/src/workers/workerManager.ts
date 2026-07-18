import { Worker } from "worker_threads";
import path from "path";
import { WorkerTelemetryData, WorkerResponse } from "./workerTypes";

export function runTelemetryWorker(
  data: WorkerTelemetryData
): Promise<WorkerResponse> {
  return new Promise((resolve, reject) => {
    const isDev =
  process.env.NODE_ENV !== "production" &&
  __filename.endsWith(".ts");



const workerPath = isDev
  ? path.resolve(__dirname, "telemetry.worker.ts")
  : path.resolve(__dirname, "telemetry.worker.js");


    const worker = new Worker(workerPath, {
      execArgv: isDev ? ["-r", "ts-node/register"] : [],
    });

    worker.postMessage(data);

    worker.on("message", (result: WorkerResponse) => {
      resolve(result);
      worker.terminate();
    });

    worker.on("error", (error) => {
      reject(error);
      worker.terminate();
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
}
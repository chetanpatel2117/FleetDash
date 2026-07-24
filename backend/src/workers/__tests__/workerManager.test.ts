import { EventEmitter } from "events";
import { Worker } from "worker_threads";
import { runTelemetryWorker } from "../workerManager";

jest.mock("worker_threads", () => ({
  Worker: jest.fn(),
}));

const MockedWorker = Worker as jest.MockedClass<typeof Worker>;

class FakeWorker extends EventEmitter {
  postMessage = jest.fn();
  terminate = jest.fn();
}

describe("runTelemetryWorker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send telemetry data to the worker", () => {
    const fakeWorker = new FakeWorker();

    MockedWorker.mockImplementation(() => fakeWorker as unknown as Worker);

    const telemetry = {
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    };

    void runTelemetryWorker(telemetry);

    expect(fakeWorker.postMessage).toHaveBeenCalledWith(telemetry);
  });

  test("should resolve when the worker returns a message", async () => {
    const fakeWorker = new FakeWorker();

    MockedWorker.mockImplementation(() => fakeWorker as unknown as Worker);

    const telemetry = {
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    };

    const workerResponse = {
      success: true,
      data: {
        vehicleId: "V001",
        latitude: 18.52,
        longitude: 73.85,
        speed: 60,
        speedCategory: "NORMAL" as const,
        processedAt: new Date().toISOString(),
      },
    };

    const promise = runTelemetryWorker(telemetry);

    fakeWorker.emit("message", workerResponse);

    await expect(promise).resolves.toEqual(workerResponse);
    expect(fakeWorker.terminate).toHaveBeenCalled();
  });

  test("should reject when the worker emits an error", async () => {
    const fakeWorker = new FakeWorker();

    MockedWorker.mockImplementation(() => fakeWorker as unknown as Worker);

    const telemetry = {
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    };

    const workerError = new Error("Worker failed");

    const promise = runTelemetryWorker(telemetry);

    fakeWorker.emit("error", workerError);

    await expect(promise).rejects.toThrow("Worker failed");
    expect(fakeWorker.terminate).toHaveBeenCalled();
  });

  test("should reject when the worker exits with a non-zero code", async () => {
    const fakeWorker = new FakeWorker();

    MockedWorker.mockImplementation(() => fakeWorker as unknown as Worker);

    const telemetry = {
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    };

    const promise = runTelemetryWorker(telemetry);

    fakeWorker.emit("exit", 1);

    await expect(promise).rejects.toThrow("Worker exited with code 1");
  });
});

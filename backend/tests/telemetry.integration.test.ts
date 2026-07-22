import request from "supertest";

// Mock Worker Thread
jest.mock("../src/workers", () => ({
  runTelemetryWorker: jest.fn().mockResolvedValue({
    success: true,
    data: {
      vehicleId: "truck101",
      latitude: 18.52,
      longitude: 73.85,
      speed: 50,
    },
  }),
}));

// Mock MongoDB Storage
jest.mock("../src/services/telemetryStorage.service", () => ({
  saveTelemetry: jest.fn().mockResolvedValue(undefined),
}));

// Mock Redis Publisher
jest.mock("../src/services/redisPublisher", () => ({
  publishVehicleUpdate: jest.fn().mockResolvedValue(undefined),
  publishVehicleAlert: jest.fn().mockResolvedValue(undefined),
}));

// Mock Geofence Publisher
jest.mock("../src/services/geofencePublisher.service", () => ({
  publishGeofenceAlert: jest.fn().mockResolvedValue(undefined),
}));

// Mock Socket.IO
jest.mock("../src/socket", () => ({
  io: {
    emit: jest.fn(),
  },
}));

import app from "../src/app";

describe("Telemetry API", () => {
  it("should receive telemetry successfully", async () => {
    const response = await request(app)
      .post("/api/telemetry")
      .send({
        vehicleId: "truck101",
        latitude: 18.52,
        longitude: 73.85,
        speed: 50,
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Telemetry received successfully"
    );

    expect(response.body.data).toMatchObject({
      vehicleId: "truck101",
      latitude: 18.52,
      longitude: 73.85,
      speed: 50,
    });
  });

  it("should return 400 when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/telemetry")
      .send({
        vehicleId: "truck101",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Missing required telemetry fields"
    );
  });
});
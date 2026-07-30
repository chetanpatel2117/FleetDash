import { processTelemetry } from "../telemetry.service";
import { runTelemetryWorker } from "../../workers";
import { saveTelemetry } from "../telemetryStorage.service";
import { publishVehicleUpdate, publishVehicleAlert } from "../redisPublisher";
import { publishGeofenceAlert } from "../geofencePublisher.service";
import { checkVehicleBoundary } from "../geofence.service";
import { getIO } from "../../socket/socket";

jest.mock("../../workers", () => ({
  runTelemetryWorker: jest.fn(),
}));

jest.mock("../telemetryStorage.service", () => ({
  saveTelemetry: jest.fn(),
}));

jest.mock("../redisPublisher", () => ({
  publishVehicleUpdate: jest.fn(),
  publishVehicleAlert: jest.fn(),
}));

jest.mock("../geofencePublisher.service", () => ({
  publishGeofenceAlert: jest.fn(),
}));

jest.mock("../geofence.service", () => ({
  checkVehicleBoundary: jest.fn(),
}));

const emitMock = jest.fn();

jest.mock("../../socket/socket", () => ({
  getIO: jest.fn(() => ({ emit: emitMock })),
}));

describe("processTelemetry", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (runTelemetryWorker as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        vehicleId: "TRK-101",
        latitude: 11.0168,
        longitude: 76.9558,
        speed: 62,
      },
    });
    (saveTelemetry as jest.Mock).mockResolvedValue(undefined);
    (publishVehicleUpdate as jest.Mock).mockResolvedValue(undefined);
    (publishVehicleAlert as jest.Mock).mockResolvedValue(undefined);
    (publishGeofenceAlert as jest.Mock).mockResolvedValue(undefined);
    (checkVehicleBoundary as jest.Mock).mockReturnValue({ inside: false, zone: null });
  });

  it("broadcasts a socket update for each accepted telemetry point", async () => {
    const result = await processTelemetry({
      vehicleId: "TRK-101",
      latitude: 11.0168,
      longitude: 76.9558,
      speed: 62,
      heading: 90,
      status: "moving",
    });

    expect(result.success).toBe(true);
    expect(getIO).toHaveBeenCalled();
    expect(emitMock).toHaveBeenCalledWith(
      "telemetry:update",
      expect.objectContaining({
        vehicleId: "TRK-101",
        latitude: 11.0168,
        longitude: 76.9558,
      })
    );
  });

  it("publishes a geofence breach alert when the vehicle leaves a monitored zone", async () => {
    (checkVehicleBoundary as jest.Mock)
      .mockReturnValueOnce({ inside: true, zone: "Warehouse" })
      .mockReturnValueOnce({ inside: false, zone: null });

    await processTelemetry({
      vehicleId: "TRK-101",
      latitude: 11.0168,
      longitude: 76.9558,
      speed: 62,
      heading: 90,
      status: "moving",
    });

    await processTelemetry({
      vehicleId: "TRK-101",
      latitude: 11.0168,
      longitude: 76.9558,
      speed: 62,
      heading: 90,
      status: "moving",
    });

    expect(publishGeofenceAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        vehicleId: "TRK-101",
        event: "geofence:breach",
      })
    );
  });

  it("continues processing telemetry even when persistence fails", async () => {
    (saveTelemetry as jest.Mock).mockRejectedValueOnce(new Error("db unavailable"));

    const result = await processTelemetry({
      vehicleId: "TRK-101",
      latitude: 11.0168,
      longitude: 76.9558,
      speed: 62,
      heading: 90,
      status: "moving",
    });

    expect(result.success).toBe(true);
    expect(publishVehicleUpdate).toHaveBeenCalled();
  });
});

import { processTelemetryData } from "../telemetryProcessor";

describe("processTelemetryData", () => {
  test("should classify speed up to 30 as SLOW", () => {
    const result = processTelemetryData({
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 30,
    });

    expect(result.speedCategory).toBe("SLOW");
    expect(result.vehicleId).toBe("V001");
    expect(result.latitude).toBe(18.52);
    expect(result.longitude).toBe(73.85);
    expect(result.speed).toBe(30);
    expect(result.processedAt).toBeDefined();
  });

  test("should classify speed between 31 and 80 as NORMAL", () => {
    const result = processTelemetryData({
      vehicleId: "V002",
      latitude: 18.53,
      longitude: 73.86,
      speed: 60,
    });

    expect(result.speedCategory).toBe("NORMAL");
  });

  test("should classify speed above 80 as FAST", () => {
    const result = processTelemetryData({
      vehicleId: "V003",
      latitude: 18.54,
      longitude: 73.87,
      speed: 100,
    });

    expect(result.speedCategory).toBe("FAST");
  });

  test("should classify zero speed as SLOW", () => {
    const result = processTelemetryData({
      vehicleId: "V004",
      latitude: 18.51,
      longitude: 73.84,
      speed: 0,
    });

    expect(result.speedCategory).toBe("SLOW");
  });

  test("should generate a valid ISO timestamp", () => {
    const result = processTelemetryData({
      vehicleId: "V005",
      latitude: 18.52,
      longitude: 73.85,
      speed: 45,
    });

    expect(new Date(result.processedAt).toISOString()).toBe(result.processedAt);
  });
});

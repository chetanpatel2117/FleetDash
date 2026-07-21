import { validateTelemetry } from "../telemetryValidator";

describe("validateTelemetry", () => {
  test("should validate correct telemetry", () => {
    const result = validateTelemetry({
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("should reject empty vehicleId", () => {
    const result = validateTelemetry({
      vehicleId: "",
      latitude: 18.52,
      longitude: 73.85,
      speed: 60,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Vehicle ID is required");
  });

  test("should reject invalid latitude", () => {
    const result = validateTelemetry({
      vehicleId: "V001",
      latitude: 100,
      longitude: 73.85,
      speed: 60,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Invalid latitude");
  });

  test("should reject invalid longitude", () => {
    const result = validateTelemetry({
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 200,
      speed: 60,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Invalid longitude");
  });

  test("should reject negative speed", () => {
    const result = validateTelemetry({
      vehicleId: "V001",
      latitude: 18.52,
      longitude: 73.85,
      speed: -1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Speed cannot be negative");
  });

  test("should report multiple validation errors", () => {
    const result = validateTelemetry({
      vehicleId: "",
      latitude: 100,
      longitude: 200,
      speed: -10,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(4);
  });
});

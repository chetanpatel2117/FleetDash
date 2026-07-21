import type { Vehicle } from "../types/vehicle";

class TelemetryBuffer {
  private vehicles = new Map<string, Vehicle>();

  update(vehicle: Vehicle) {
    this.vehicles.set(vehicle.id, vehicle);
  }

  updateMany(vehicles: Vehicle[]) {
    vehicles.forEach((vehicle) => {
      this.vehicles.set(vehicle.id, vehicle);
    });
  }

  flush(): Vehicle[] {
    const updates = Array.from(this.vehicles.values());

    this.vehicles.clear();

    return updates;
  }

  size() {
    return this.vehicles.size;
  }

  clear() {
    this.vehicles.clear();
  }
}

export const telemetryBuffer = new TelemetryBuffer();
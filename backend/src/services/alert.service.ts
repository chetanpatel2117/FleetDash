import { GeofenceAlert } from "../interfaces/alert.interface";

export class AlertService {
  private vehicleStates = new Map<string, boolean>();

  public checkGeofenceState(
    vehicleId: string,
    isInside: boolean,
    latitude: number,
    longitude: number
  ): GeofenceAlert | null {

    const previousState = this.vehicleStates.get(vehicleId);

    // Save the current state
    this.vehicleStates.set(vehicleId, isInside);

    // First telemetry received for this vehicle
    if (previousState === undefined) {
      return null;
    }

    // No change
    if (previousState === isInside) {
      return null;
    }

    // State changed
    return {
      vehicleId,
      event: isInside ? "geofence:entry" : "geofence:breach",
      latitude,
      longitude,
      timestamp: new Date(),
    };
  }
}
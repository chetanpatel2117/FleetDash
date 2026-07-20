import * as turf from "@turf/turf";

export class GeofenceService {
  private geofence = turf.polygon([
    [
      [75.3400, 19.8700],
      [75.3500, 19.8700],
      [75.3500, 19.8800],
      [75.3400, 19.8800],
      [75.3400, 19.8700]
    ]
  ]);

  public isInside(latitude: number, longitude: number): boolean {
    const point = turf.point([longitude, latitude]);

    return turf.booleanPointInPolygon(point, this.geofence);
  }
}
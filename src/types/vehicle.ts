export interface VehicleTelemetry {
  vehicleId: string
  latitude: number
  longitude: number
  speed: number
  heading?: number
  status?: string
  timestamp?: string
}

import { useVehicleContext } from "../context/VehicleContext";

export function useVehicles() {
  return useVehicleContext();
}
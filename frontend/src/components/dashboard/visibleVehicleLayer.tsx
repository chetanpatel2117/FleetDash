import type { Vehicle } from "../../types/vehicle";
import { useVisibleVehicles } from "../../hooks/useVisibleVehicles";
import VehicleMarkers from "./VehicleMarkers";

interface VisibleVehicleLayerProps {
  vehicles: Vehicle[];
}

function VisibleVehicleLayer ({ vehicles }: VisibleVehicleLayerProps) {
  const visibleVehicles = useVisibleVehicles(vehicles);

  return <VehicleMarkers vehicles={visibleVehicles} />;
}

export default VisibleVehicleLayer;

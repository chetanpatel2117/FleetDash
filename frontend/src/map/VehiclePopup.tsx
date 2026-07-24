import { useSelectedVehicle } from "../hooks/useSelectedVehicle";

function VehiclePopup () {
  const vehicle = useSelectedVehicle();

  // No popup on map.
  // Details are shown in right-side panel.

  if (!vehicle) {
    return null;
  }

  return null;
}

export default VehiclePopup;

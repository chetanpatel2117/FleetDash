import { Marker } from "react-leaflet";
import L from "leaflet";

import { useSelectedVehicle } from "../hooks/useSelectedVehicle";
import { useVehicleHistory } from "../hooks/useVehicleHistory";
import { useRouteAnimation } from "../hooks/useRouteAnimation";

const vehicleIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      font-size:28px;
    ">
      🚚
    </div>
  `,
});

function ReplayVehicleMarker () {
  const selectedVehicle = useSelectedVehicle();

  const history = useVehicleHistory(selectedVehicle?.id);

  const { currentIndex } = useRouteAnimation(history.length);

  if (!selectedVehicle || history.length === 0) {
    return null;
  }

    const position = history[Math.min(currentIndex, history.length - 1)];
    
    console.log("Replay marker position:", currentIndex, position);


  if (!position) {
    return null;
  }

  return <Marker position={[position.lat, position.lng]} icon={vehicleIcon} />;
}

export default ReplayVehicleMarker;

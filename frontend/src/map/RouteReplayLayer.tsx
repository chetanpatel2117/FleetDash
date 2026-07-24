import { Polyline } from "react-leaflet";

import { useSelectedVehicle } from "../hooks/useSelectedVehicle";
import { useVehicleHistory } from "../hooks/useVehicleHistory";
import { useRouteReplay } from "../hooks/useRouteReplay";

function RouteReplayLayer () {
  const selectedVehicle = useSelectedVehicle();

  const { showRoute } = useRouteReplay();

  const history = useVehicleHistory(selectedVehicle?.id);

  if (!selectedVehicle || !showRoute) {
    return null;
  }

  if (history.length < 2) {
    return null;
  }

  const positions = history.map(point => [point.lat, point.lng] as [number, number]);

  return <Polyline positions={positions} weight={4} />;
}

export default RouteReplayLayer;

import { Polyline } from "react-leaflet";

import { getHistory } from "..//store/vehicleHistoryStore";

import { useSelectedVehicle } from "..//hooks/useSelectedVehicle";

import { useRouteReplay } from "..//hooks/useRouteReplay";

function RouteReplayLayer () {
  const selectedVehicle = useSelectedVehicle();

  const { showRoute } = useRouteReplay();

  if (!selectedVehicle || !showRoute) {
    return null;
  }

  const history = getHistory(selectedVehicle.id);

  if (history.length < 2) {
    return null;
  }

  const positions = history.map(point => [point.lat, point.lng] as [number, number]);

  return <Polyline positions={positions} weight={4} />;
}

export default RouteReplayLayer;

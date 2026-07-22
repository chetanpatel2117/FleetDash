import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { VehicleCanvasLayer } from "../../map/VehicleCanvasLayer";
import { useVehicleContext } from "../../context/VehicleContext";

export default function CanvasLayer () {
  const map = useMap();

  const { setSelectedVehicle } = useVehicleContext();

  useEffect(() => {
    const layer = new VehicleCanvasLayer(setSelectedVehicle);

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, setSelectedVehicle]);

  return null;
}

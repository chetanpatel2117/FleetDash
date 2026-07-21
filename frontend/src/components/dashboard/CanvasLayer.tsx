import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { VehicleCanvasLayer } from "../../map/VehicleCanvasLayer";

export default function CanvasLayer () {
  const map = useMap();

  useEffect(() => {
    const layer = new VehicleCanvasLayer();

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
}

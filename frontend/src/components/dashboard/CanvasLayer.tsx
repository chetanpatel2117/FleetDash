import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { VehicleCanvasLayer } from "../../map/VehicleCanvasLayer";
import type { Vehicle } from "../../types/vehicle";

interface CanvasLayerProps {
  vehicles: Vehicle[];
}

export default function CanvasLayer ({ vehicles }: CanvasLayerProps) {
  const map = useMap();

  useEffect(() => {
    const layer = new VehicleCanvasLayer();

    layer.setVehicles(vehicles);

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  useEffect(() => {
    map.eachLayer(layer => {
      if (layer instanceof VehicleCanvasLayer) {
        layer.setVehicles(vehicles);
      }
    });
  }, [vehicles, map]);

  return null;
}

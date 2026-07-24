import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import { VehicleCanvasLayer } from "../../map/VehicleCanvasLayer";
import type { Vehicle } from "../../types/vehicle";

interface CanvasLayerProps {
  vehicles: Vehicle[];
}

export default function CanvasLayer ({ vehicles }: CanvasLayerProps) {
  const map = useMap();

  const layerRef = useRef<VehicleCanvasLayer | null>(null);

  useEffect(() => {
    const layer = new VehicleCanvasLayer();

    layerRef.current = layer;

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  useEffect(() => {
    layerRef.current?.setVehicles(vehicles);
  }, [vehicles]);

  return null;
}

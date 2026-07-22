import { useEffect, useMemo, useState } from "react";
import { useMap } from "react-leaflet";
import type { Vehicle } from "../types/vehicle";

export function useVisibleVehicles(vehicles: Vehicle[]) {
  const map = useMap();

  const [bounds, setBounds] = useState(map.getBounds());

  useEffect(() => {
    const updateBounds = () => {
      setBounds(map.getBounds());
    };

    map.on("moveend", updateBounds);
    map.on("zoomend", updateBounds);

    return () => {
      map.off("moveend", updateBounds);
      map.off("zoomend", updateBounds);
    };
  }, [map]);

  const visibleVehicles = useMemo(() => {
    return vehicles.filter((vehicle) =>
      bounds.contains([vehicle.latitude, vehicle.longitude])
    );
  }, [vehicles, bounds]);

  return visibleVehicles;
}
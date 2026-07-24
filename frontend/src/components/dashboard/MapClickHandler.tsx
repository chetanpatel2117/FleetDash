import { useMap } from "react-leaflet";
import { useEffect } from "react";

import { clearSelectedVehicle } from "../../store/vehicleStore";

export default function MapClickHandler () {
  const map = useMap();

  useEffect(() => {
    const clickHandler = () => {
      clearSelectedVehicle();
    };

    map.on("click", clickHandler);

    return () => {
      map.off("click", clickHandler);
    };
  }, [map]);

  return null;
}

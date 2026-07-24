import { useEffect, useState } from "react";
import { getSelectedVehicle, subscribe } from "../store/vehicleStore";

export function useSelectedVehicle () {
  const [vehicle, setVehicle] = useState(getSelectedVehicle());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setVehicle(getSelectedVehicle());
    });

    return unsubscribe;
  }, []);

  return vehicle;
}

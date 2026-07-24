import { useEffect, useState } from "react";

import {
  getHistory,
  subscribeHistory
} from "../store/vehicleHistoryStore";


export function useVehicleHistory(
  vehicleId?: string
) {

  const [, setVersion] = useState(0);


  useEffect(() => {

    return subscribeHistory(() => {

      setVersion(
        value => value + 1
      );

    });

  }, []);


  if (!vehicleId) {
    return [];
  }


  return getHistory(vehicleId);

}
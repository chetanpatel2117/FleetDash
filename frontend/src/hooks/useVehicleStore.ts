import { useSyncExternalStore } from "react";

import {
  subscribe,
  getVehicles,
  getSelectedVehicle,
  getSelectedVehicleId,
  selectVehicle,
} from "../store/vehicleStore";


export function useVehicleStore() {


  useSyncExternalStore(
    subscribe,
    getSelectedVehicleId
  );


  return {

    vehicles: getVehicles(),

    selectedVehicle:
      getSelectedVehicle(),

    selectedVehicleId:
      getSelectedVehicleId(),

    selectVehicle,

  };

}
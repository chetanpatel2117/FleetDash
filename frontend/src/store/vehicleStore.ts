import type { Vehicle } from "../types/vehicle";
import { addHistory } from "./vehicleHistoryStore";


const vehicleMap =
  new Map<string, Vehicle>();



let selectedVehicleId:
  string | null = null;



const subscribers =
  new Set<() => void>();



function notify() {

  subscribers.forEach(
    callback => callback()
  );

}



/*
    VEHICLE METHODS
*/


export function updateVehicles(
  vehicles: Vehicle[]
) {


  vehicles.forEach(vehicle => {


    vehicleMap.set(
      vehicle.id,
      vehicle
    );



    addHistory(
      vehicle.id,
      {
        lat: vehicle.latitude,
        lng: vehicle.longitude,
      }
    );


  });



  notify();

}






export function setVehicle(
  vehicle: Vehicle
) {


  vehicleMap.set(
    vehicle.id,
    vehicle
  );



  notify();

}






export function getVehicles() {


  return Array.from(
    vehicleMap.values()
  );

}






export function getVehicle(
  id: string
) {


  return vehicleMap.get(id);


}






export function clearVehicles() {


  vehicleMap.clear();


  selectedVehicleId = null;


  notify();

}





/*
    SELECTION METHODS
*/



export function selectVehicle(
  id: string
) {


  const vehicle =
    vehicleMap.get(id);



  if(!vehicle){

    return;

  }



  selectedVehicleId =
    id;



  notify();


}







export function clearSelectedVehicle() {


  selectedVehicleId =
    null;



  notify();


}







export function getSelectedVehicleId() {


  return selectedVehicleId;


}







export function getSelectedVehicle() {


  if(!selectedVehicleId){

    return null;

  }



  return (
    vehicleMap.get(
      selectedVehicleId
    )
    ??
    null
  );


}







/*
    SUBSCRIPTION
*/



export function subscribe(
  callback: () => void
) {


  subscribers.add(
    callback
  );



  return () => {


    subscribers.delete(
      callback
    );


  };


}
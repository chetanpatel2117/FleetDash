import type { Vehicle } from "../types/vehicle";
import { updateVehiclePosition } from "../map/vehicleInterpolation";


let vehicleMap: Record<string, Vehicle> = {};



export function setVehicle(vehicle: Vehicle) {


    vehicleMap[vehicle.id] = vehicle;


    updateVehiclePosition(vehicle);

}





export function updateVehicles(
    updatedVehicles: Vehicle[]
) {


    updatedVehicles.forEach(vehicle => {


        vehicleMap[vehicle.id] = vehicle;


        updateVehiclePosition(vehicle);


    });


}






export function getVehicle(id: string) {


    return vehicleMap[id];


}






export function getVehicles(): Vehicle[] {


    return Object.values(vehicleMap);


}







export function clearVehicles() {


    vehicleMap = {};


}
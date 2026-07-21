import type{ Vehicle } from "../types/vehicle";


type Position = {
    latitude:number;
    longitude:number;
};


const previousPositions =
    new Map<string, Position>();


const currentPositions =
    new Map<string, Position>();



export function updateVehiclePosition(
    vehicle:Vehicle
){


    const old =
        currentPositions.get(
            vehicle.id
        );


    if(old){

        previousPositions.set(
            vehicle.id,
            old
        );

    }


    currentPositions.set(
        vehicle.id,
        {
            latitude: vehicle.latitude,
            longitude: vehicle.longitude
        }
    );


}




export function getInterpolatedPosition(
    id:string,
    factor:number
){


    const previous =
        previousPositions.get(id);


    const current =
        currentPositions.get(id);



    if(!current)
        return null;



    if(!previous)
        return current;



    return {

        latitude:
            previous.latitude +
            (
                current.latitude -
                previous.latitude
            )
            *
            factor,


        longitude:
            previous.longitude +
            (
                current.longitude -
                previous.longitude
            )
            *
            factor

    };


}
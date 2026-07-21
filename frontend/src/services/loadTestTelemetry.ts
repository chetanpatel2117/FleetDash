import type { Vehicle } from "../types/vehicle";


export function generateTestVehicles(
  count: number
): Vehicle[] {


  const vehicles: Vehicle[] = [];



  for (let i = 0; i < count; i++) {


    vehicles.push({

      id: `TEST-${i}`,

      name: `Vehicle ${i}`,

      latitude:
        11.0168 + Math.random() * 0.05,


      longitude:
        76.9558 + Math.random() * 0.05,


      speed:
        Math.floor(
          Math.random() * 100
        ),


      heading:
        Math.floor(
          Math.random() * 360
        ),


      status:
        Math.random() > 0.2
          ? "moving"
          : "idle",


      lastUpdated:
        new Date().toISOString()

    });


  }



  return vehicles;

}
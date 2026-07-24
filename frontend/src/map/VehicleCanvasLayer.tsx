import * as L from "leaflet";

import {
  getVehicles,
  selectVehicle,
  getSelectedVehicleId,
} from "../store/vehicleStore";

import {
  getHistory,
} from "../store/vehicleHistoryStore";

import type { Vehicle } from "../types/vehicle";


export class VehicleCanvasLayer extends L.Layer {


  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  private map!: L.Map;

  private animationFrameId!: number;


  private selectedVehicleId:
    string | null = null;

  private vehicles: Vehicle[] = [];

  setVehicles(
    vehicles:Vehicle[]
  ){
    this.vehicles = vehicles;
  }

  private readonly CLICK_RADIUS = 15;



  constructor() {

    super();

  }




  onAdd(
    map: L.Map
  ): this {


    this.map = map;



    this.canvas =
      L.DomUtil.create(
        "canvas",
        "vehicle-canvas"
      );



    const size =
      map.getSize();



    this.canvas.width =
      size.x;


    this.canvas.height =
      size.y;



    this.ctx =
      this.canvas.getContext("2d")!;



    /*
      Canvas must receive clicks
    */

    this.canvas.style.pointerEvents =
      "auto";



    L.DomEvent.disableClickPropagation(
      this.canvas
    );



    this.canvas.addEventListener(
      "click",
      this.handleCanvasClick
    );




    const pane =
      map.getPanes()
      .overlayPane;



    pane.appendChild(
      this.canvas
    );




    map.on(
      "move zoom",
      this.reset,
      this
    );



    map.on(
      "resize",
      this.resize,
      this
    );



    this.reset();


    this.startAnimation();



    return this;

  }







  private reset = () => {


    const topLeft =
      this.map.containerPointToLayerPoint([
        0,
        0
      ]);



    L.DomUtil.setPosition(
      this.canvas,
      topLeft
    );



    const size =
      this.map.getSize();



    this.canvas.width =
      size.x;


    this.canvas.height =
      size.y;


  };







  private resize = () => {


    const size =
      this.map.getSize();



    this.canvas.width =
      size.x;



    this.canvas.height =
      size.y;



    this.reset();

  };







  private startAnimation(){


    const animate = () => {


      this.draw();



      this.animationFrameId =
        requestAnimationFrame(
          animate
        );


    };


    animate();

  }








  private handleCanvasClick = (
    e: MouseEvent
  ) => {


    const rect =
      this.canvas.getBoundingClientRect();



    const clickX =
      e.clientX -
      rect.left;



    const clickY =
      e.clientY -
      rect.top;



    const vehicles =
      getVehicles();



    let nearestVehicle:
      Vehicle | null = null;



    let nearestDistance =
      Infinity;





    for(
      const vehicle of vehicles
    ){



      const point =
        this.map.latLngToContainerPoint([
          vehicle.latitude,
          vehicle.longitude
        ]);




      const dx =
        point.x -
        clickX;



      const dy =
        point.y -
        clickY;



      const distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );




      if(
        distance <
        nearestDistance &&
        distance <=
        this.CLICK_RADIUS
      ){

        nearestDistance =
          distance;



        nearestVehicle =
          vehicle;

      }


    }






    if(nearestVehicle){


      console.log(
        "Vehicle selected:",
        nearestVehicle.name
      );



      selectVehicle(
        nearestVehicle.id
      );


    }


  };



  private drawTrail(
    vehicle: Vehicle
  ){


    const history =
      getHistory(
        vehicle.id
      );



    if(history.length < 2)
      return;



    this.ctx.beginPath();




    const firstPoint =
      this.map.latLngToContainerPoint([
        history[0].lat,
        history[0].lng
      ]);



    this.ctx.moveTo(
      firstPoint.x,
      firstPoint.y
    );




    for(
      let i = 1;
      i < history.length;
      i++
    ){


      const point =
        this.map.latLngToContainerPoint([
          history[i].lat,
          history[i].lng
        ]);



      this.ctx.lineTo(
        point.x,
        point.y
      );


    }



    this.ctx.strokeStyle =
      "#60a5fa";



    this.ctx.lineWidth =
      2;



    this.ctx.stroke();


  }









  private drawVehicle(
    vehicle: Vehicle
  ){


    const point =
      this.map.latLngToContainerPoint([
        vehicle.latitude,
        vehicle.longitude
      ]);



    const selected =
      vehicle.id ===
      this.selectedVehicleId;





    if(selected){


      this.ctx.beginPath();



      this.ctx.arc(
        point.x,
        point.y,
        14,
        0,
        Math.PI * 2
      );



      this.ctx.strokeStyle =
        "#38bdf8";



      this.ctx.lineWidth =
        3;



      this.ctx.stroke();


    }






    this.ctx.beginPath();



    this.ctx.arc(
      point.x,
      point.y,
      selected ? 8 : 6,
      0,
      Math.PI * 2
    );



    this.ctx.fillStyle =

      vehicle.status === "moving"

      ? "#16a34a"

      : vehicle.status === "idle"

      ? "#eab308"

      : "#ef4444";



    this.ctx.fill();


  }









  private draw = () => {


    if(!this.ctx)
      return;



    this.selectedVehicleId =
      getSelectedVehicleId();



    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );



    const vehicles =
this.vehicles;



    vehicles.forEach(vehicle => {


      this.drawTrail(
        vehicle
      );


      this.drawVehicle(
        vehicle
      );


    });


  };








  onRemove(
    map: L.Map
  ): this {


    cancelAnimationFrame(
      this.animationFrameId
    );



    map.off(
      "move zoom",
      this.reset,
      this
    );



    map.off(
      "resize",
      this.resize,
      this
    );



    this.canvas.removeEventListener(
      "click",
      this.handleCanvasClick
    );



    this.canvas.remove();



    return this;

  }


}
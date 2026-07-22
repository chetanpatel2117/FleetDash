import * as L from "leaflet";
import { getVehicles } from "../store/vehicleStore";
import type { Vehicle } from "../types/vehicle";


export class VehicleCanvasLayer extends L.Layer {


    private canvas!: HTMLCanvasElement;

    private ctx!: CanvasRenderingContext2D;

    private map!: L.Map;

    private animationFrameId!: number;



    onAdd(map: L.Map): this {


        this.map = map;


        this.canvas =
            L.DomUtil.create(
                "canvas",
                "vehicle-canvas"
            );


        const size =
            map.getSize();


        this.canvas.width = size.x;

        this.canvas.height = size.y;



        this.ctx =
            this.canvas.getContext("2d")!;



        map.getPanes()
            .overlayPane
            .appendChild(this.canvas);



        map.on(
            "resize",
            this.resize,
            this
        );



        this.startAnimation();



        return this;

    }




    private resize = () => {


        const size =
            this.map.getSize();


        this.canvas.width = size.x;

        this.canvas.height = size.y;


    };





    private startAnimation() {


        const animate = () => {


            this.draw();



            this.animationFrameId =
                requestAnimationFrame(
                    animate
                );


        };



        animate();

    }







    draw = () => {


        if (!this.ctx)
            return;



        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );



        const vehicles: Vehicle[] =
            getVehicles();



        vehicles.forEach(
            (vehicle: Vehicle) => {


                const point =
                    this.map.latLngToContainerPoint(
                        [
                            vehicle.latitude,
                            vehicle.longitude
                        ]
                    );



                this.ctx.beginPath();



                this.ctx.arc(
                    point.x,
                    point.y,
                    6,
                    0,
                    Math.PI * 2
                );



                this.ctx.fillStyle =
                    vehicle.status === "moving"
                    ? "green"
                    : "red";



                this.ctx.fill();


            }
        );


    };







    onRemove(map: L.Map): this {


        cancelAnimationFrame(
            this.animationFrameId
        );



        if(this.canvas){

            this.canvas.remove();

        }



        map.off(
            "resize",
            this.resize,
            this
        );



        return this;

    }

}
import * as L from "leaflet";
import { getVehicles } from "../store/vehicleStore";
import type { Vehicle } from "../types/vehicle";

export class VehicleCanvasLayer extends L.Layer {
  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  private map!: L.Map;

  private animationFrameId!: number;

  private selectedVehicleId: string | null = null;

  private readonly CLICK_RADIUS = 12;

  private onVehicleSelect?: (vehicle: Vehicle) => void;

constructor(
  onVehicleSelect?: (vehicle: Vehicle) => void
) {
  super();

  this.onVehicleSelect = onVehicleSelect;
}

  onAdd(map: L.Map): this {
    this.map = map;

    this.canvas = L.DomUtil.create("canvas", "vehicle-canvas");

    const size = map.getSize();

    this.canvas.width = size.x;
    this.canvas.height = size.y;

    this.ctx = this.canvas.getContext("2d")!;

    map.getPanes().overlayPane.appendChild(this.canvas);

    map.on("resize", this.resize, this);

    map.on("click", this.handleClick, this);

    this.startAnimation();

    return this;
  }

  private resize = () => {
    const size = this.map.getSize();

    this.canvas.width = size.x;
    this.canvas.height = size.y;
  };

  private startAnimation() {
    const animate = () => {
      this.draw();

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  private handleClick = (e: L.LeafletMouseEvent) => {
    const clickPoint = this.map.latLngToContainerPoint(e.latlng);

    const vehicles = getVehicles();

    let nearestVehicle: Vehicle | null = null;
    let nearestDistance = Infinity;

    for (const vehicle of vehicles) {
      const point = this.map.latLngToContainerPoint([
        vehicle.latitude,
        vehicle.longitude,
      ]);

      const dx = point.x - clickPoint.x;
      const dy = point.y - clickPoint.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (
        distance < nearestDistance &&
        distance <= this.CLICK_RADIUS
      ) {
        nearestDistance = distance;
        nearestVehicle = vehicle;
      }
    }

    if (nearestVehicle) {
      this.selectedVehicleId = nearestVehicle.id;

      this.onVehicleSelect?.(nearestVehicle);
    }
  };

  private drawVehicle(vehicle: Vehicle) {
    const point = this.map.latLngToContainerPoint([
      vehicle.latitude,
      vehicle.longitude,
    ]);

    const isSelected = vehicle.id === this.selectedVehicleId;

    this.ctx.beginPath();

    this.ctx.arc(
      point.x,
      point.y,
      isSelected ? 8 : 6,
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

    if (isSelected) {
      this.ctx.beginPath();

      this.ctx.arc(
        point.x,
        point.y,
        11,
        0,
        Math.PI * 2
      );

      this.ctx.strokeStyle = "#2563eb";
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  draw = () => {
    if (!this.ctx) return;

    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    const vehicles = getVehicles();

    for (const vehicle of vehicles) {
      this.drawVehicle(vehicle);
    }
  };

  onRemove(map: L.Map): this {
    cancelAnimationFrame(this.animationFrameId);

    if (this.canvas) {
      this.canvas.remove();
    }

    map.off("resize", this.resize, this);

    map.off("click", this.handleClick, this);

    return this;
  }
}
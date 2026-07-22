import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import type { Vehicle } from "../../types/vehicle";

interface FleetCanvasProps {
  vehicles: Vehicle[];
}

function FleetCanvas ({ vehicles }: FleetCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const map = useMap();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vehicles.forEach(vehicle => {
      const point = map.latLngToContainerPoint([vehicle.latitude, vehicle.longitude]);

      ctx.beginPath();

      ctx.fillStyle = "#22c55e";

      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);

      ctx.fill();
    });
  }, [vehicles, map]);

  return <canvas ref={canvasRef} className='absolute inset-0 h-full w-full pointer-events-none' />;
}

export default FleetCanvas;

import { memo, useEffect, useRef } from "react";
import type { Vehicle } from "../../types/vehicle";
import { useVehicles } from "../../hooks/useVehicles";

interface CanvasMapProps {
  vehicles: Vehicle[];
}

function CanvasMap({ vehicles }: CanvasMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const vehiclesRef = useRef<Vehicle[]>(vehicles);
  const { setSelectedVehicle } = useVehicles();

  useEffect(() => {
    vehiclesRef.current = vehicles;
  }, [vehicles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toCanvasPoint = (vehicle: Vehicle, width: number, height: number) => {
      const points = vehiclesRef.current;
      if (!points.length) {
        return { x: width / 2, y: height / 2 };
      }

      const latitudes = points.map(point => point.latitude);
      const longitudes = points.map(point => point.longitude);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latRange = Math.max(maxLat - minLat, 0.001);
      const lngRange = Math.max(maxLng - minLng, 0.001);
      const padding = Math.min(width, height) * 0.1;

      const x = padding + ((vehicle.longitude - minLng) / lngRange) * (width - padding * 2);
      const y = height - padding - ((vehicle.latitude - minLat) / latRange) * (height - padding * 2);

      return { x, y };
    };

    const drawVehicle = (vehicle: Vehicle, width: number, height: number) => {
      const { x, y } = toCanvasPoint(vehicle, width, height);
      const isSelected = vehicle.id === vehiclesRef.current[0]?.id;

      context.save();
      context.translate(x, y);
      context.rotate((vehicle.heading * Math.PI) / 180);

      context.fillStyle = vehicle.status === "offline" ? "#64748b" : vehicle.status === "idle" ? "#f59e0b" : "#22c55e";
      context.beginPath();
      context.arc(0, 0, 7, 0, Math.PI * 2);
      context.fill();

      if (isSelected) {
        context.lineWidth = 2;
        context.strokeStyle = "#f8fafc";
        context.beginPath();
        context.arc(0, 0, 11, 0, Math.PI * 2);
        context.stroke();
      }

      context.strokeStyle = "#f8fafc";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(18, 0);
      context.stroke();

      context.restore();

      context.fillStyle = "#e2e8f0";
      context.font = "12px sans-serif";
      context.fillText(vehicle.name, x + 10, y - 10);
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      context.clearRect(0, 0, width, height);

      context.fillStyle = "#020617";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(148, 163, 184, 0.12)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y < height; y += 40) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      if (!vehiclesRef.current.length) {
        context.fillStyle = "#94a3b8";
        context.font = "16px sans-serif";
        context.fillText("Waiting for vehicle telemetry…", 16, 24);
      } else {
        vehiclesRef.current.forEach(vehicle => drawVehicle(vehicle, width, height));
      }

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    const handleResize = () => {
      resizeCanvas();
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let hitVehicle: Vehicle | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      vehiclesRef.current.forEach(vehicle => {
        const point = toCanvasPoint(vehicle, rect.width, rect.height);
        const distance = Math.hypot(point.x - x, point.y - y);

        if (distance < 24 && distance < closestDistance) {
          closestDistance = distance;
          hitVehicle = vehicle;
        }
      });

      if (hitVehicle) {
        setSelectedVehicle(hitVehicle);
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setSelectedVehicle]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default memo(CanvasMap);

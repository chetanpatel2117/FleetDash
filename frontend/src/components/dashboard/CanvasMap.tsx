import { memo, useEffect, useRef } from "react";
import type { Vehicle } from "../../types/vehicle";
import { useVehicles } from "../../hooks/useVehicles";
import socket from "../../services/socket";

interface CanvasMapProps {
  vehicles: Vehicle[];
}

function CanvasMap({ vehicles }: CanvasMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const vehiclesRef = useRef<Vehicle[]>(vehicles);
  const selectedVehicleIdRef = useRef<string | null>(null);
  const { selectedVehicle, setSelectedVehicle } = useVehicles();

  useEffect(() => {
    vehiclesRef.current = vehicles;
  }, [vehicles]);

  useEffect(() => {
    selectedVehicleIdRef.current = selectedVehicle?.id ?? null;
  }, [selectedVehicle]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleTelemetry = (nextVehicles: Vehicle[]) => {
      vehiclesRef.current = nextVehicles;
    };

    socket.on("telemetry:update", handleTelemetry);

    return () => {
      socket.off("telemetry:update", handleTelemetry);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getBounds = (points: Vehicle[]) => {
      if (!points.length) {
        return { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 };
      }

      const latitudes = points.map(point => point.latitude);
      const longitudes = points.map(point => point.longitude);

      return {
        minLat: Math.min(...latitudes),
        maxLat: Math.max(...latitudes),
        minLng: Math.min(...longitudes),
        maxLng: Math.max(...longitudes),
      };
    };

    const toCanvasPoint = (
      vehicle: Vehicle,
      width: number,
      height: number,
      bounds: ReturnType<typeof getBounds>
    ) => {
      const latRange = Math.max(bounds.maxLat - bounds.minLat, 0.001);
      const lngRange = Math.max(bounds.maxLng - bounds.minLng, 0.001);
      const padding = Math.min(width, height) * 0.12;

      const x = padding + ((vehicle.longitude - bounds.minLng) / lngRange) * (width - padding * 2);
      const y = height - padding - ((vehicle.latitude - bounds.minLat) / latRange) * (height - padding * 2);

      return { x, y };
    };

    const drawVehicle = (
      vehicle: Vehicle,
      width: number,
      height: number,
      bounds: ReturnType<typeof getBounds>,
      radius: number
    ) => {
      const { x, y } = toCanvasPoint(vehicle, width, height, bounds);
      const isSelected = vehicle.id === selectedVehicleIdRef.current;

      context.save();
      context.translate(x, y);
      context.rotate((vehicle.heading * Math.PI) / 180);

      context.fillStyle =
        vehicle.status === "offline"
          ? "#64748b"
          : vehicle.status === "idle"
          ? "#f59e0b"
          : "#22c55e";
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fill();

      if (isSelected) {
        context.lineWidth = 2;
        context.strokeStyle = "#f8fafc";
        context.beginPath();
        context.arc(0, 0, radius + 4, 0, Math.PI * 2);
        context.stroke();
      }

      context.strokeStyle = "#f8fafc";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(radius + 11, 0);
      context.stroke();

      context.restore();

      if (vehiclesRef.current.length <= 120) {
        context.fillStyle = "#e2e8f0";
        context.font = "12px sans-serif";
        context.fillText(vehicle.name, x + 10, y - 10);
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (!width || !height) {
        animationFrameRef.current = window.requestAnimationFrame(render);
        return;
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#020617";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(148, 163, 184, 0.12)";
      context.lineWidth = 1;
      const gridStep = Math.max(28, Math.min(56, Math.round(Math.min(width, height) / 12)));

      for (let x = 0; x < width; x += gridStep) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y < height; y += gridStep) {
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
        const bounds = getBounds(vehiclesRef.current);
        const radius = vehiclesRef.current.length > 80 ? 4 : vehiclesRef.current.length > 40 ? 5 : 7;

        vehiclesRef.current.forEach(vehicle => drawVehicle(vehicle, width, height, bounds, radius));
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
      const bounds = getBounds(vehiclesRef.current);

      vehiclesRef.current.forEach(vehicle => {
        const point = toCanvasPoint(vehicle, rect.width, rect.height, bounds);
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
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default memo(CanvasMap);

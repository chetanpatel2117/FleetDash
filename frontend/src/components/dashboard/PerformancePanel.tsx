import { Activity, Car, Monitor, Wifi, WifiOff } from "lucide-react";

interface PerformancePanelProps {
  totalVehicles: number;
  visibleVehicles: number;
  connected: boolean;
  fps: number;
  frameTime: number;
}

function PerformancePanel ({
  totalVehicles,
  visibleVehicles,
  connected,
  fps,
  frameTime,
}: PerformancePanelProps) {
  const items = [
    {
      label: "Total Vehicles",
      value: totalVehicles,
      icon: <Car className='h-4 w-4 text-cyan-400' />,
    },
    {
      label: "Visible Vehicles",
      value: visibleVehicles,
      icon: <Activity className='h-4 w-4 text-green-400' />,
    },
    {
      label: "Connection",
      value: connected ? "Connected" : "Disconnected",
      icon: connected ? (
        <Wifi className='h-4 w-4 text-green-400' />
      ) : (
        <WifiOff className='h-4 w-4 text-red-400' />
      ),
      valueClass: connected ? "text-green-400" : "text-red-400",
    },
    {
      label: "Render Mode",
      value: "Canvas",
      icon: <Monitor className='h-4 w-4 text-yellow-400' />,
    },
    {
      label: "FPS",
      value: fps,
      icon: <Monitor className='h-4 w-4 text-purple-400' />,
    },
    {
      label: "Frame Time",
      value: `${frameTime.toFixed(2)} ms`,
      icon: <Activity className='h-4 w-4 text-orange-400' />,
    },
  ];

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-5'>
      <div className='mb-5 flex items-center gap-2'>
        <Activity className='h-5 w-5 text-cyan-400' />

        <h2 className='text-xl font-semibold text-white'>Performance</h2>
      </div>

      <div className='space-y-3'>
        {items.map(item => (
          <div
            key={item.label}
            className='flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3'
          >
            <div className='flex items-center gap-3'>
              {item.icon}

              <span className='text-sm text-slate-300'>{item.label}</span>
            </div>

            <span className={`font-semibold ${item.valueClass ?? "text-white"}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformancePanel;

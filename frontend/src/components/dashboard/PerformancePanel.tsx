import { Activity, Monitor, Wifi, WifiOff, Car } from "lucide-react";

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
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-6'>
      <div className='mb-6 flex items-center gap-3'>
        <Activity className='h-6 w-6 text-cyan-400' />

        <h2 className='text-2xl font-semibold text-white'>Performance</h2>
      </div>

      <div className='space-y-5'>
        {/* Total Vehicles */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            <Car className='h-5 w-5 text-cyan-400' />

            <span className='text-slate-300'>Total Vehicles</span>
          </div>

          <span className='font-semibold text-white'>{totalVehicles}</span>
        </div>

        {/* Visible Vehicles */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            <Activity className='h-5 w-5 text-emerald-400' />

            <span className='text-slate-300'>Visible Vehicles</span>
          </div>

          <span className='font-semibold text-white'>{visibleVehicles}</span>
        </div>

        {/* Connection */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            {connected ? (
              <Wifi className='h-5 w-5 text-green-400' />
            ) : (
              <WifiOff className='h-5 w-5 text-red-400' />
            )}

            <span className='text-slate-300'>Connection</span>
          </div>

          <span className={`font-semibold ${connected ? "text-green-400" : "text-red-400"}`}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {/* Render Mode */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            <Monitor className='h-5 w-5 text-yellow-400' />

            <span className='text-slate-300'>Render Mode</span>
          </div>

          <span className='font-semibold text-white'>Canvas</span>
        </div>

        {/* FPS */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            <Monitor className='h-5 w-5 text-purple-400' />

            <span className='text-slate-300'>FPS</span>
          </div>

          <span className='font-semibold text-white'>{fps}</span>
        </div>

        {/* Frame Time */}

        <div className='flex items-center justify-between rounded-lg bg-slate-700/40 p-3'>
          <div className='flex items-center gap-3'>
            <Activity className='h-5 w-5 text-orange-400' />

            <span className='text-slate-300'>Frame Time</span>
          </div>

          <span className='font-semibold text-white'>{frameTime.toFixed(2)} ms</span>
        </div>
      </div>
    </div>
  );
}

export default PerformancePanel;

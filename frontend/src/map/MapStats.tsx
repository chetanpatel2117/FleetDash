import type { Vehicle } from "../types/vehicle";

interface MapStatsProps {
  vehicles: Vehicle[];
}

function MapStats ({ vehicles }: MapStatsProps) {
  const moving = vehicles.filter(v => v.status === "moving").length;

  const idle = vehicles.filter(v => v.status === "idle").length;

  const offline = vehicles.filter(v => v.status === "offline").length;

  return (
    <div
      className='
      grid
      grid-cols-3
      gap-4
      mb-4
    '
    >
      <div
        className='
        rounded-xl
        bg-slate-900
        border
        border-slate-700
        p-4
      '
      >
        <p className='text-slate-400 text-sm'>Moving</p>

        <p className='text-2xl font-bold text-emerald-400'>{moving}</p>
      </div>

      <div
        className='
        rounded-xl
        bg-slate-900
        border
        border-slate-700
        p-4
      '
      >
        <p className='text-slate-400 text-sm'>Idle</p>

        <p className='text-2xl font-bold text-yellow-400'>{idle}</p>
      </div>

      <div
        className='
        rounded-xl
        bg-slate-900
        border
        border-slate-700
        p-4
      '
      >
        <p className='text-slate-400 text-sm'>Offline</p>

        <p className='text-2xl font-bold text-red-400'>{offline}</p>
      </div>
    </div>
  );
}

export default MapStats;

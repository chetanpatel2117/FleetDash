import { memo } from "react";

import FleetMap from "./FleetMap";
import type { Vehicle } from "../../types/vehicle";

interface LiveMapCardProps {
  vehicles: Vehicle[];
}

function LiveMapCard ({ vehicles }: LiveMapCardProps) {
  const hasVehicles = vehicles.length > 0;

  return (
    <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold text-white'>Live Fleet Map</h2>
          <p className='mt-1 text-sm text-slate-400'>
            {hasVehicles ? `${vehicles.length} vehicles in view` : "Waiting on fresh telemetry"}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hasVehicles ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700 text-slate-300"}`}>
          {hasVehicles ? "Tracking" : "Idle"}
        </span>
      </div>

      <div className='relative overflow-hidden rounded-2xl border border-slate-800'>
        <FleetMap vehicles={vehicles} />

        {!hasVehicles && (
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/70'>
            <div className='rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-center text-slate-300'>
              <p className='font-semibold text-white'>No vehicle telemetry yet</p>
              <p className='mt-1 text-sm'>The map will populate as new data arrives.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(LiveMapCard);

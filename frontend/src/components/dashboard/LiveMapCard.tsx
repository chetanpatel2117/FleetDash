import { memo } from "react";

import FleetMap from "./FleetMap";
import type { Vehicle } from "../../types/vehicle";

interface LiveMapCardProps {
  vehicles: Vehicle[];
}

function LiveMapCard ({ vehicles }: LiveMapCardProps) {
  const hasVehicles = vehicles.length > 0;

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-900 p-5'>
      <h2 className='mb-4 text-xl font-semibold text-white'>Live Fleet Map</h2>

      <div className='h-[500px] overflow-hidden rounded-lg'>
        <FleetMap vehicles={vehicles} />
      </div>
    </div>
  );
}

export default memo(LiveMapCard);

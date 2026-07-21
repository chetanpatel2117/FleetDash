import { memo } from "react";

import type { Vehicle } from "../../types/vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[];
}

function VehicleTable ({ vehicles }: VehicleTableProps) {
  if (!vehicles.length) {
    return (
      <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center text-slate-400'>
        No vehicle telemetry is available yet.
      </div>
    );
  }

  return (
    <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-6'>
      <h2 className='mb-6 text-xl font-semibold text-white'>Live Vehicle Status</h2>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-slate-700'>
            <tr className='text-left text-slate-400'>
              <th className='pb-4'>Vehicle</th>
              <th className='pb-4'>Status</th>
              <th className='pb-4'>Speed</th>
              <th className='pb-4'>Latitude</th>
              <th className='pb-4'>Longitude</th>
              <th className='pb-4'>Updated</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map(vehicle => (
              <tr
                key={vehicle.id}
                className='border-b border-slate-700 transition-colors hover:bg-slate-700/30'
              >
                <td className='py-4 font-medium text-white'>{vehicle.name}</td>

                <td className='py-4'>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      vehicle.status === "moving"
                        ? "bg-green-500/20 text-green-400"
                        : vehicle.status === "idle"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>

                <td className='py-4 text-slate-300'>{vehicle.speed} km/h</td>

                <td className='py-4 text-slate-300'>{vehicle.latitude.toFixed(4)}</td>

                <td className='py-4 text-slate-300'>{vehicle.longitude.toFixed(4)}</td>

                <td className='py-4 text-slate-400'>
                  {new Date(vehicle.lastUpdated).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(VehicleTable);

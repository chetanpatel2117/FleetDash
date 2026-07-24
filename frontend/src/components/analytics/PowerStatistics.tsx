import { Fuel, Battery, Signal } from "lucide-react";

interface PowerStatisticsProps {
  data: {
    averageFuel: number;
    averageBattery: number;
    averageSignal: number;
    lowFuelVehicles: number;
    lowBatteryVehicles: number;
  };
}

function PowerStatistics ({ data }: PowerStatisticsProps) {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg'>
      <div className='mb-5 flex items-center gap-2'>
        <Fuel size={20} className='text-cyan-400' />

        <h2 className='text-lg font-semibold text-white'>Fuel & Battery Statistics</h2>
      </div>

      <div className='grid grid-cols-3 gap-5'>
        <div>
          <p className='text-sm text-slate-400'>Average Fuel</p>

          <p className='text-2xl font-bold text-cyan-400'>{data.averageFuel}%</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Average Battery</p>

          <p className='text-2xl font-bold text-emerald-400'>{data.averageBattery}%</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Signal Strength</p>

          <p className='text-2xl font-bold text-blue-400'>{data.averageSignal}%</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Low Fuel Vehicles</p>

          <p className='text-2xl font-bold text-red-400'>{data.lowFuelVehicles}</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Low Battery Vehicles</p>

          <p className='text-2xl font-bold text-orange-400'>{data.lowBatteryVehicles}</p>
        </div>
      </div>
    </div>
  );
}

export default PowerStatistics;

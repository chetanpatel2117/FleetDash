import { Gauge } from "lucide-react";

interface SpeedStatisticsProps {
  data: {
    averageSpeed: number;
    maxSpeed: number;
    minSpeed: number;
    movingPercentage: number;
  };
}

function SpeedStatistics ({ data }: SpeedStatisticsProps) {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg'>
      <div className='mb-5 flex items-center gap-2'>
        <Gauge size={20} className='text-cyan-400' />

        <h2 className='text-lg font-semibold text-white'>Speed Statistics</h2>
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <div>
          <p className='text-sm text-slate-400'>Average Speed</p>

          <p className='text-2xl font-bold text-cyan-400'>{data.averageSpeed} km/h</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Maximum Speed</p>

          <p className='text-2xl font-bold text-white'>{data.maxSpeed} km/h</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Minimum Speed</p>

          <p className='text-2xl font-bold text-white'>{data.minSpeed} km/h</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Moving Vehicles</p>

          <p className='text-2xl font-bold text-emerald-400'>{data.movingPercentage}%</p>
        </div>
      </div>
    </div>
  );
}

export default SpeedStatistics;

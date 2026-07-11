import { Map } from "lucide-react";

function LiveMapCard () {
  return (
    <div>
      <h2 className='mb-5 text-2xl font-semibold text-white'>Live Fleet Map</h2>

      <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all duration-300 hover:border-cyan-500'>
        <div className='flex h-96 flex-col items-center justify-center'>
          <div className='rounded-full bg-slate-700 p-5'>
            <Map size={60} className='text-cyan-400' />
          </div>

          <h3 className='mt-6 text-2xl font-semibold text-white'>Live Fleet Map</h3>

          <p className='mt-2 text-center text-slate-400'>
            Canvas API integration scheduled for Week 3.
          </p>

          <p className='mt-1 text-sm text-slate-500'>Waiting for live telemetry...</p>
        </div>
      </div>
    </div>
  );
}

export default LiveMapCard;

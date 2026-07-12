import { Map } from "lucide-react";

function LiveMapCard () {
  return (
    <div>
      <h2 className='mb-5 text-2xl font-semibold text-white'>Live Fleet Map</h2>

      <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm'>
        <div className='flex h-96 flex-col items-center justify-center'>
          <Map size={70} className='text-cyan-500' />

          <h3 className='mt-6 text-2xl font-semibold text-white'>Live Map Coming Soon</h3>

          <p className='mt-2 text-slate-400'>Canvas API integration scheduled for Week 3.</p>
        </div>
      </div>
    </div>
  );
}

export default LiveMapCard;

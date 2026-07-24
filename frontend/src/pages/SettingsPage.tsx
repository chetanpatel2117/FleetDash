import { useState } from "react";
import { Route, RefreshCw, LocateFixed } from "lucide-react";

function SettingsPage () {
  const [autoFollow, setAutoFollow] = useState(true);

  const [showTrails, setShowTrails] = useState(true);

  const [trailLength, setTrailLength] = useState(50);

  const [refreshInterval, setRefreshInterval] = useState(1000);

  return (
    <div className='p-6 text-white'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Settings</h1>

        <p className='text-slate-400'>Configure FleetDash behavior</p>
      </div>

      <div className='grid gap-5'>
        {/* Auto Follow */}

        <div className='rounded-xl border border-slate-700 bg-slate-900 p-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <LocateFixed />

              <div>
                <h2 className='font-semibold'>Auto Follow Vehicle</h2>

                <p className='text-sm text-slate-400'>Automatically move map to selected vehicle</p>
              </div>
            </div>

            <input
              type='checkbox'
              checked={autoFollow}
              onChange={e => setAutoFollow(e.target.checked)}
              className='h-5 w-5'
            />
          </div>
        </div>

        {/* Trails */}

        <div className='rounded-xl border border-slate-700 bg-slate-900 p-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Route />

              <div>
                <h2 className='font-semibold'>Show Vehicle Trails</h2>

                <p className='text-sm text-slate-400'>Display vehicle movement history</p>
              </div>
            </div>

            <input
              type='checkbox'
              checked={showTrails}
              onChange={e => setShowTrails(e.target.checked)}
              className='h-5 w-5'
            />
          </div>
        </div>

        {/* Trail Length */}

        <div className='rounded-xl border border-slate-700 bg-slate-900 p-5'>
          <h2 className='font-semibold mb-3'>Trail Length</h2>

          <input
            type='range'
            min='10'
            max='100'
            value={trailLength}
            onChange={e => setTrailLength(Number(e.target.value))}
            className='w-full'
          />

          <p className='text-slate-400 mt-2'>{trailLength} points</p>
        </div>

        {/* Refresh Interval */}

        <div className='rounded-xl border border-slate-700 bg-slate-900 p-5'>
          <div className='flex items-center gap-3 mb-3'>
            <RefreshCw />

            <h2 className='font-semibold'>Map Refresh Interval</h2>
          </div>

          <select
            value={refreshInterval}
            onChange={e => setRefreshInterval(Number(e.target.value))}
            className='
              bg-slate-800
              border
              border-slate-700
              rounded-lg
              px-3
              py-2
            '
          >
            <option value={500}>500 ms</option>

            <option value={1000}>1 second</option>

            <option value={2000}>2 seconds</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

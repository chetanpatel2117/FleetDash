import { Download } from "lucide-react";

interface VehicleToolbarProps {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  vehicleCount: number;

  onExport: () => void;
}

function VehicleToolbar ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  vehicleCount,
  onExport,
}: VehicleToolbarProps) {
  return (
    <div className='mb-6 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-800 p-4 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex flex-1 gap-4'>
        <input
          type='text'
          placeholder='Search vehicles...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500'
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className='rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white'
        >
          <option value='all'>All</option>
          <option value='moving'>Moving</option>
          <option value='idle'>Idle</option>
          <option value='offline'>Offline</option>
        </select>
      </div>

      <div className='flex items-center gap-4'>
        <span className='text-sm text-slate-400'>{vehicleCount} Vehicles</span>

        <button
          onClick={onExport}
          className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700'
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default VehicleToolbar;

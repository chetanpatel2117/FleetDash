type StatusFilterProps = {
  status: string;
  setStatus: (value: string) => void;
};

function StatusFilter ({ status, setStatus }: StatusFilterProps) {
  return (
    <select
      value={status}
      onChange={e => setStatus(e.target.value)}
      className='rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500'
    >
      <option value='all'>All Vehicles</option>
      <option value='moving'>Moving</option>
      <option value='idle'>Idle</option>
      <option value='offline'>Offline</option>
    </select>
  );
}

export default StatusFilter;

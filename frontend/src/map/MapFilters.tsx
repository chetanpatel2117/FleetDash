interface MapFiltersProps {
  filter: "all" | "moving" | "idle" | "offline";
  setFilter: (value: "all" | "moving" | "idle" | "offline") => void;
}

function MapFilters ({ filter, setFilter }: MapFiltersProps) {
  const filters = ["all", "moving", "idle", "offline"] as const;

  return (
    <div className='flex flex-wrap gap-3'>
      {filters.map(item => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`
            rounded-lg
            border
            px-4
            py-2
            text-sm
            font-medium
            transition

            ${
              filter === item
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-slate-900 border-slate-700 text-white"
            }
          `}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default MapFilters;

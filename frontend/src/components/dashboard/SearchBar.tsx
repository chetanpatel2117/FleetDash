type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

function SearchBar ({ search, setSearch }: SearchBarProps) {
  return (
    <div className='w-full'>
      <input
        type='text'
        placeholder='Search vehicles...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500'
      />
    </div>
  );
}

export default SearchBar;

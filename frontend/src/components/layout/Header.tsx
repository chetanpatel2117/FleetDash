import { Bell, Search, CircleUserRound } from "lucide-react";

function Header () {
  return (
<header className="flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900 px-6">      {/* Left Section */}
      <div>
        <h2 className='text-xl font-semibold text-white'>Dashboard</h2>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* Search */}

        <div className='flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2'>
          <Search size={18} className='text-slate-400' />

          <input
            type='text'
            placeholder='Search vehicles...'
            className='bg-transparent text-sm text-white outline-none placeholder:text-slate-500'
          />
        </div>

        {/* Notification */}

        <button className='rounded-lg bg-slate-800 p-2 hover:bg-slate-700 transition-colors'>
          <Bell size={20} className='text-white' />
        </button>

        {/* Profile */}

        <button className='rounded-full bg-slate-800 p-2 hover:bg-slate-700 transition-colors'>
          <CircleUserRound size={22} className='text-white' />
        </button>
      </div>
    </header>
  );
}

export default Header;

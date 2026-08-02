import { useEffect, useRef, useState } from "react";
import { Bell, CircleUserRound, LogOut, Search, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicleContext } from "../../context/VehicleContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { connected, dashboardSearch, setDashboardSearch } = useVehicleContext();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  const notificationButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuOpen &&
        profileMenuRef.current &&
        profileButtonRef.current &&
        !profileMenuRef.current.contains(target) &&
        !profileButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }

      if (
        notificationsOpen &&
        notificationMenuRef.current &&
        notificationButtonRef.current &&
        !notificationMenuRef.current.contains(target) &&
        !notificationButtonRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, notificationsOpen]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
    }
  };

  const connectionStatus = connected
    ? {
        text: "Connected",
        textColor: "text-green-400",
        bgColor: "bg-green-500/20",
        dotColor: "bg-green-400",
      }
    : {
        text: "Disconnected",
        textColor: "text-red-400",
        bgColor: "bg-red-500/20",
        dotColor: "bg-red-400",
      };

  return (
    <header className='flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900 px-6'>
      {/* Left Section */}
      <div>
        <Link to='/' className='text-xl font-semibold text-white transition-colors hover:text-cyan-300'>
          FleetDash
        </Link>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {/* Connection Status */}
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${connectionStatus.bgColor} ${connectionStatus.textColor}`}
        >
          <div className={`h-2 w-2 rounded-full ${connectionStatus.dotColor}`} />

          {connectionStatus.text}
        </div>

        {/* Search */}
        <div className='flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2'>
          <Search size={18} className='text-slate-400' />

          <input
            type='text'
            placeholder='Search vehicles...'
            value={dashboardSearch}
            onChange={e => setDashboardSearch(e.target.value)}
            className='bg-transparent text-sm text-white outline-none placeholder:text-slate-500'
          />
        </div>

        {/* Notification */}
        <div className='relative'>
          <button
            ref={notificationButtonRef}
            onClick={() => setNotificationsOpen((open) => !open)}
            className='rounded-lg bg-slate-800 p-2 transition-colors hover:bg-slate-700'
          >
            <Bell size={20} className='text-white' />
          </button>

          {notificationsOpen ? (
            <div
              ref={notificationMenuRef}
              className='absolute right-0 mt-2 w-72 rounded-xl border border-slate-700 bg-slate-800 p-3 shadow-xl shadow-slate-950/40'
            >
              <div className='mb-3 flex items-center justify-between'>
                <span className='text-sm font-semibold text-white'>Notifications</span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className='text-sm text-slate-400 transition-colors hover:text-white'
                >
                  Close
                </button>
              </div>
              <div className='rounded-xl bg-slate-900 p-3 text-sm text-slate-300'>
                No new notifications.
              </div>
            </div>
          ) : null}
        </div>

        {/* Profile */}
        <div className='relative'>
          <button
            ref={profileButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            className='rounded-full bg-slate-800 p-2 transition-colors hover:bg-slate-700'
          >
            <CircleUserRound size={22} className='text-white' />
          </button>

          {menuOpen ? (
            <div
              ref={profileMenuRef}
              className='absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-800 p-2 shadow-xl shadow-slate-950/40'
            >
              <Link
                to='/profile'
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700'
              >
                <UserRound size={16} className='text-cyan-400' />
                Profile
              </Link>
              <Link
                to='/settings'
                onClick={() => setMenuOpen(false)}
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700'
              >
                <Settings size={16} className='text-cyan-400' />
                Settings
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-slate-700'
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
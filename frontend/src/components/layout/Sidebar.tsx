import {
  LayoutDashboard,
  Truck,
  Map,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Vehicles",
    path: "/vehicles",
    icon: Truck,
  },
  {
    title: "Live Map",
    path: "/map",
    icon: Map,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar () {
  const { isAdmin, logout } = useAuth();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-slate-700 bg-slate-900">
      {/* Logo Section */}
      <div className='h-16 flex items-center gap-3 px-6 border-b border-slate-700'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500'>
          <Truck size={22} className='text-white' />
        </div>

        <div>
          <h1 className='text-lg font-bold text-white'>FleetDash</h1>

          <p className='text-xs text-slate-400'>Fleet Monitoring</p>
        </div>
      </div>
      {/* Navigation */}
      <nav className='mt-6 flex-1 px-3'>
        {menuItems.map(item => {
          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className='border-t border-slate-700 p-4'>
        <div className='flex items-center gap-3'>
        
        </div>

        {isAdmin ? (
          <button
            onClick={handleLogout}
            className='mt-3 flex w-full items-center gap-2 bg-red-500 rounded-lg border border-slate-700 px-3 py-2 text-sm text-black transition-colors hover:bg-cyan-600'
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <Link
            to='/login'
            className='mt-3 flex w-full items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white'
          >
            <LogOut size={16} />
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;

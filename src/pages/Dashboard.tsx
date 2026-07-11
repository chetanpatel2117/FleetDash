import { Map } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import { dashboardStats } from "../constants/dashboard";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import FleetActivity from "../components/dashboard/FleetActivity";

function Dashboard () {
  return (
    <div>
      {/* Welcome Section */}
      <section>
        <h1 className='text-3xl font-bold text-white'>Welcome Back 👋</h1>

        <p className='mt-2 text-slate-400'>Monitor your fleet performance in real time.</p>
      </section>

      {/* Statistics Section */}
      <section className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {dashboardStats.map(stat => (
            <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon} />
        ))}
      </section>

      {/* Live Map & Alerts Section */}
      <section className='mt-10'>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          {/* Live Map */}
          <div className='xl:col-span-2'>
            <h2 className='mb-5 text-2xl font-semibold text-white'>Live Fleet Map</h2>

            <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm'>
              <div className='flex h-96 flex-col items-center justify-center'>
                <Map size={70} className='text-cyan-500' />

                <h3 className='mt-6 text-2xl font-semibold text-white'>Live Map Coming Soon</h3>

                <p className='mt-2 text-slate-400'>Canvas API integration scheduled for Week 3.</p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <AlertsPanel />
        </div>
      </section>

      {/* Fleet Activity */}
      <section className='mt-10'>
        <FleetActivity />
      </section>
    </div>
  );
}

export default Dashboard;

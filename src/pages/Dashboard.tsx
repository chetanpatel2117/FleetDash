import { Truck, Activity, CirclePause, WifiOff } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import LiveMapCard from "../components/dashboard/LiveMapCard";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import FleetActivity from "../components/dashboard/FleetActivity";

import { useVehicles } from "../hooks/useVehicles";
import VehicleTable from "../components/dashboard/VehicleTable";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";

function Dashboard () {
  const { vehicles } = useVehicles();

  const dashboardStats = [
    {
      title: "Active Vehicles",
      value: vehicles.length.toString(),
      icon: Truck,
    },
    {
      title: "Moving Vehicles",
      value: vehicles.filter(vehicle => vehicle.status === "moving").length.toString(),
      icon: Activity,
    },
    {
      title: "Idle Vehicles",
      value: vehicles.filter(vehicle => vehicle.status === "idle").length.toString(),
      icon: CirclePause,
    },
    {
      title: "Offline Vehicles",
      value: vehicles.filter(vehicle => vehicle.status === "offline").length.toString(),
      icon: WifiOff,
    },
  ];

  return (
    <div className='space-y-10 p-6'>
      {/* Welcome Section */}
      <section>
        <h1 className='text-3xl font-bold text-white'>Welcome Back 👋</h1>

        <p className='mt-2 text-slate-400'>Monitor your fleet performance in real time.</p>
      </section>
      {/* Statistics Section */}
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {dashboardStats.map(stat => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </section>
      {/* Live Map & Alerts */}
      <section>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          <div className='xl:col-span-2'>
            <LiveMapCard />
          </div>

          <VehicleDetailsPanel />
        </div>
      </section>
      ;{/* Fleet Activity */}
      <section>
        <FleetActivity />
      </section>
      {/* Vehicle Table */}
      <section>
        <VehicleTable />
      </section>
      ;
    </div>
  );
}

export default Dashboard;

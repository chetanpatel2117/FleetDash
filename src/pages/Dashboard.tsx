import { Truck, Activity, CirclePause, WifiOff } from "lucide-react";
import { useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import LiveMapCard from "../components/dashboard/LiveMapCard";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import FleetActivity from "../components/dashboard/FleetActivity";

import { useVehicles } from "../hooks/useVehicles";
import VehicleTable from "../components/dashboard/VehicleTable";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";

import SearchBar from "../components/dashboard/SearchBar";
import StatusFilter from "../components/dashboard/StatusFilter";

function Dashboard () {
  const { vehicles } = useVehicles();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      {/* Search Section */}
      <section className='mt-8 flex flex-col gap-4 md:flex-row'>
        <div className='flex-1'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <StatusFilter status={statusFilter} setStatus={setStatusFilter} />
      </section>
      ; ;{/* Statistics Section */}
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {dashboardStats.map(stat => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </section>
      {/* Live Map & Alerts */}
      <section>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          <div className='xl:col-span-2'>
            <LiveMapCard vehicles = { filteredVehicles }/>
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
        <VehicleTable vehicles={filteredVehicles} />
      </section>
      ;
    </div>
  );
}

export default Dashboard;

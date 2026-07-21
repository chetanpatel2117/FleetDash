import { useEffect, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import LiveMapCard from "../components/dashboard/LiveMapCard";
import FleetActivity from "../components/dashboard/FleetActivity";
import VehicleTable from "../components/dashboard/VehicleTable";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";
import SearchBar from "../components/dashboard/SearchBar";
import StatusFilter from "../components/dashboard/StatusFilter";
import PerformancePanel from "../components/dashboard/PerformancePanel";

import { useVehicles } from "../hooks/useVehicles";
import { getDashboardStats } from "../constants/dashboardStats";
import RenderLoopDemo from "../components/dashboard/RenderLoopDemo";
import { useFPS } from "../hooks/useFPS";

import { generateTestVehicles } from "../services/loadTestTelemetry";
import { ENABLE_LOAD_TEST, LOAD_TEST_COUNT } from "../constants/performance";

import { updateVehicles } from "../store/vehicleStore";

function Dashboard () {
  const { vehicles, connected } = useVehicles();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const { fps, frameTime } = useFPS();

  // Load test vehicles

  useEffect(() => {
    if (ENABLE_LOAD_TEST) {
      const testVehicles = generateTestVehicles(LOAD_TEST_COUNT);

      updateVehicles(testVehicles);
    }
  }, []);

  const dashboardStats = getDashboardStats(vehicles);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalVehicles = vehicles.length;

  const visibleVehicles = filteredVehicles.length;

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

      {/* Statistics Section */}

      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {dashboardStats.map(stat => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </section>

      {/* Map + Panels */}

      <section>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          {/* Map */}

          <div className='xl:col-span-2'>
            <LiveMapCard vehicles={filteredVehicles} />
          </div>

          {/* Right Side */}

          <div className='space-y-4'>
            <VehicleDetailsPanel />

            <PerformancePanel
              totalVehicles={totalVehicles}
              visibleVehicles={visibleVehicles}
              connected={connected}
              fps={fps}
              frameTime={frameTime}
            />

            <RenderLoopDemo />
          </div>
        </div>
      </section>

      {/* Fleet Activity */}

      <section>
        <FleetActivity />
      </section>

      {/* Vehicle Table */}

      <section>
        <VehicleTable vehicles={filteredVehicles} />
      </section>
    </div>
  );
}

export default Dashboard;

import { useDeferredValue, useEffect, useMemo, useState } from "react";

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
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    if (ENABLE_LOAD_TEST) {
      const testVehicles = generateTestVehicles(LOAD_TEST_COUNT);
      updateVehicles(testVehicles);
    }
  }, []);

  const dashboardStats = useMemo(() => getDashboardStats(vehicles), [vehicles]);

  const filteredVehicles = useMemo(() => {
    const query = deferredSearch.toLowerCase();

    return vehicles.filter(vehicle => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.id.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [deferredSearch, statusFilter, vehicles]);

  const totalVehicles = vehicles.length;
  const visibleVehicles = filteredVehicles.length;
  const isLoading = !connected && totalVehicles === 0;
  const hasNoMatches = !isLoading && filteredVehicles.length === 0;
  const connectionBadgeClass = connected
    ? "bg-emerald-500/15 text-emerald-400"
    : "bg-amber-500/15 text-amber-400";

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_45%),_#020617] p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl space-y-6'>
        <section className='overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <div className='mb-3 flex flex-wrap items-center gap-2'>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${connectionBadgeClass}`}>
                  {connected ? "Live telemetry" : "Reconnecting"}
                </span>
                <span className='rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-sm text-slate-300'>
                  {totalVehicles} vehicles tracked
                </span>
              </div>

              <h1 className='text-3xl font-bold text-white'>Welcome Back 👋</h1>
              <p className='mt-2 max-w-2xl text-slate-400'>Monitor your fleet performance in real time with a calmer, faster dashboard.</p>
            </div>

            <div className='rounded-2xl border border-slate-800 bg-slate-800/70 p-4 text-sm text-slate-300'>
              <div className='font-medium text-white'>System status</div>
              <div className='mt-2 flex items-center justify-between gap-6'>
                <span>{connected ? "Telemetry flowing" : "Waiting on data stream"}</span>
                <span className='font-semibold text-cyan-400'>{fps} fps</span>
              </div>
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:flex-row md:items-center'>
          <div className='flex-1'>
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <StatusFilter status={statusFilter} setStatus={setStatusFilter} />
        </section>

        <section className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {dashboardStats.map(stat => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </section>

        <section>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
            <div className='xl:col-span-2'>
              {isLoading ? (
                <div className='flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-inner'>
                  <div className='mb-4 h-3 w-32 animate-pulse rounded-full bg-cyan-500/30' />
                  <div className='mb-2 h-3 w-48 animate-pulse rounded-full bg-slate-700' />
                  <div className='h-3 w-40 animate-pulse rounded-full bg-slate-700' />
                </div>
              ) : (
                <LiveMapCard vehicles={filteredVehicles} />
              )}
            </div>

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

        <section>
          {hasNoMatches ? (
            <div className='rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center text-slate-400'>
              No vehicles match your current filter.
            </div>
          ) : (
            <FleetActivity />
          )}
        </section>

        <section>
          <VehicleTable vehicles={filteredVehicles} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

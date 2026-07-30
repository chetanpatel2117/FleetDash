import { useEffect, useMemo } from "react";
import { useLiveAlerts } from "../hooks/useLiveAlerts";

import StatCard from "../components/dashboard/StatCard";
import LiveMapCard from "../components/dashboard/LiveMapCard";
import FleetActivity from "../components/dashboard/FleetActivity";
import VehicleTable from "../components/dashboard/VehicleTable";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";
import PerformancePanel from "../components/dashboard/PerformancePanel";
import RenderLoopDemo from "../components/dashboard/RenderLoopDemo";
import SearchBar from "../components/dashboard/SearchBar";
import StatusFilter from "../components/dashboard/StatusFilter";

import { useVehicleContext } from "../context/VehicleContext";
import { getDashboardStats } from "../constants/dashboardStats";
import { useFPS } from "../hooks/useFPS";
import { generateTestVehicles } from "../services/loadTestTelemetry";
import { ENABLE_LOAD_TEST, LOAD_TEST_COUNT } from "../constants/performance";
import { updateVehicles } from "../store/vehicleStore";

function Dashboard() {
  const {
    vehicles,
    connected,
    dashboardSearch: search,
    dashboardStatusFilter: statusFilter,
    setDashboardSearch,
    setDashboardStatusFilter,
  } = useVehicleContext();
  const { fps, frameTime } = useFPS();
  const liveAlerts = useLiveAlerts();

  useEffect(() => {
    if (ENABLE_LOAD_TEST) {
      const testVehicles = generateTestVehicles(LOAD_TEST_COUNT);
      updateVehicles(testVehicles);
    }
  }, []);

  const dashboardStats = useMemo(() => getDashboardStats(vehicles), [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, statusFilter]);

  const totalVehicles = vehicles.length;
  const visibleVehicles = filteredVehicles.length;

  return (
    <div className="space-y-5 p-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px] xl:items-end">
        <div className="w-full">
          <SearchBar search={search} setSearch={setDashboardSearch} />
        </div>

        <div className="w-full xl:w-56">
          <StatusFilter status={statusFilter} setStatus={setDashboardStatusFilter} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 items-stretch h-[600px] xl:grid-cols-3">
        <div className="h-full xl:col-span-2">
          <LiveMapCard vehicles={filteredVehicles} />
        </div>
        <div className="h-full min-h-0 xl:col-span-1">
          <VehicleDetailsPanel />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 items-start xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="space-y-3">
            <FleetActivity />
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Live Geofence Alerts</h3>
                <span className="text-xs text-slate-400">{liveAlerts.length} active</span>
              </div>
              <div className="space-y-2">
                {liveAlerts.length === 0 ? (
                  <p className="text-sm text-slate-500">No geofence activity yet.</p>
                ) : (
                  liveAlerts.map((alert) => (
                    <div key={alert.id} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                      <p className="text-sm font-medium text-white">{alert.vehicleName}</p>
                      <p className="text-sm text-slate-400">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <PerformancePanel
          totalVehicles={totalVehicles}
          visibleVehicles={visibleVehicles}
          connected={connected}
          fps={fps}
          frameTime={frameTime}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 items-start xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VehicleTable vehicles={filteredVehicles} />
        </div>

        <RenderLoopDemo />
      </section>
    </div>
  );
}

export default Dashboard;

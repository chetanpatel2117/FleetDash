import { useEffect, useMemo, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import LiveMapCard from "../components/dashboard/LiveMapCard";
import FleetActivity from "../components/dashboard/FleetActivity";
import VehicleTable from "../components/dashboard/VehicleTable";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";
import PerformancePanel from "../components/dashboard/PerformancePanel";
import RenderLoopDemo from "../components/dashboard/RenderLoopDemo";

import { useVehicleContext } from "../context/VehicleContext";
import { getDashboardStats } from "../constants/dashboardStats";
import { useFPS } from "../hooks/useFPS";
import { generateTestVehicles } from "../services/loadTestTelemetry";
import { ENABLE_LOAD_TEST, LOAD_TEST_COUNT } from "../constants/performance";
import { updateVehicles } from "../store/vehicleStore";

function Dashboard() {
  const { vehicles, connected } = useVehicleContext();
  const [search] = useState("");
  const [statusFilter] = useState("all");
  const { fps, frameTime } = useFPS();

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
          <FleetActivity />
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

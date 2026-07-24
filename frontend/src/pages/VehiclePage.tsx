import { useMemo, useState } from "react";
import { exportVehiclesToCSV } from "../utils/csvExports";

import VehicleToolbar from "../components/vehicles/VehicleToolbar";
import VehicleDataTable from "../components/vehicles/VehicleDataTable";
import { useVehicleContext } from "../context/VehicleContext";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";

function VehiclesPage () {
  const { vehicles } = useVehicleContext();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch =
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, search, statusFilter]);

  const handleExport = () => {
    exportVehiclesToCSV(filteredVehicles);
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold text-white'>Vehicles</h1>

        <p className='mt-2 text-slate-400'>Manage and monitor your fleet vehicles.</p>
      </div>
      {/* Toolbar */}
      <VehicleToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        vehicleCount={filteredVehicles.length}
        onExport={handleExport}
      />
      {/* Vehicles Content */}
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
        {/* Table */}

        <section className='xl:col-span-2'>
          <VehicleDataTable vehicles={filteredVehicles} />
        </section>

        {/* Details */}

        <section>
          <VehicleDetailsPanel />
        </section>
      </div>
      ;
    </div>
  );
}

export default VehiclesPage;

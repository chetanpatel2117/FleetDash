import FleetMap from "../components/dashboard/FleetMap";
import MapStats from "../map/MapStats";
import { useVehicleContext } from "../context/VehicleContext";
import VehicleDetailsPanel from "../components/dashboard/VehicleDetailsPanel";
import { useSelectedVehicle } from "../hooks/useSelectedVehicle";
import { useState } from "react";
import MapFilters from "../map/MapFilters";



function LiveMapPage () {
  const { vehicles } = useVehicleContext();

  const selectedVehicle = useSelectedVehicle();

  const [filter, setFilter] = useState<"all" | "moving" | "idle" | "offline">("all");

  const [followVehicle, setFollowVehicle] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filter === "all") return true;

    return vehicle.status === filter;
  });

  return (
    <div className='space-y-6 text-white'>
      <h1 className='mb-4 text-2xl font-bold'>Live Fleet Map</h1>
      <MapStats vehicles={vehicles} />
      <button
        onClick={() => setFollowVehicle(prev => !prev)}
        className={`
    rounded-lg
    px-4
    py-2
    font-medium
    ${followVehicle ? "bg-green-500 text-black" : "bg-slate-800 text-white border border-slate-700"}
  `}
      >
        {followVehicle ? "Following Vehicle" : "Follow Selected Vehicle"}
      </button>
      
      <MapFilters filter={filter} setFilter={setFilter} />
      <div
        className='
          mt-4
          h-[500px]
          w-full
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-4
        '
      >
        {/* MAP */}

        <div
          className='
            xl:col-span-3
            h-full
            min-h-0
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900
          '
        >
          <FleetMap vehicles={filteredVehicles}  />
        </div>

        {/* DETAILS */}

        <div
          className='
            xl:col-span-1
            h-full
            min-h-0
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            flex
            flex-col
          '
        >
          <div className='h-full min-h-0'>
            {selectedVehicle ? (
              <VehicleDetailsPanel />
            ) : (
              <div className='flex h-full items-center justify-center p-6 text-center text-slate-400'>
                Select a vehicle on the map
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveMapPage;

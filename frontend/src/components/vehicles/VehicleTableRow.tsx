import type { Vehicle } from "../../types/vehicle";
import VehicleStatusBadge from "./VehicleStatusBadge";
import { useVehicleStore } from "../../hooks/useVehicleStore";

interface VehicleTableRowProps {
  vehicle: Vehicle;
}

function VehicleTableRow ({ vehicle }: VehicleTableRowProps) {
  const { selectedVehicleId, selectVehicle } = useVehicleStore();

  const isSelected = selectedVehicleId === vehicle.id;

  return (
    <tr
      onClick={() => selectVehicle(vehicle.id)}
      aria-selected={isSelected}
      className={`
        cursor-pointer
        border-b
        border-slate-700
        transition-colors

        ${isSelected ? "bg-blue-900/40" : "odd:bg-slate-950 even:bg-slate-900 hover:bg-slate-800"}
      `}
    >
      <td className='px-4 py-4 text-sm font-semibold text-white'>{vehicle.name}</td>

      <td className='px-4 py-4 text-center font-mono text-sm text-slate-400'>{vehicle.id}</td>

      <td className='px-4 py-4 text-center'>
        <VehicleStatusBadge status={vehicle.status} />
      </td>

      <td className='px-4 py-4 text-right text-sm font-medium text-slate-100'>
        {vehicle.speed} km/h
      </td>

      <td className='px-4 py-4 text-center text-sm text-slate-400'>{vehicle.lastUpdated}</td>
    </tr>
  );
}

export default VehicleTableRow;

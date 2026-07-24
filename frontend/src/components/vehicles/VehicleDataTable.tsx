import { useMemo, useState } from "react";
import type { Vehicle } from "../../types/vehicle";
import VehicleTableRow from "./VehicleTableRow";



interface VehicleDataTableProps {
  vehicles: Vehicle[];
}

function VehicleDataTable ({ vehicles }: VehicleDataTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Vehicle>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const headerClass =
    "sticky top-0 z-10 cursor-pointer border-b border-slate-700 bg-slate-800 px-4 py-4 text-center text-sm font-semibold tracking-wide text-slate-200 transition-colors hover:bg-slate-700 select-none";

  const handleSort = (column: keyof Vehicle) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedVehicles = useMemo(() => {
    const sorted = [...vehicles];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "id":
          comparison = a.id.localeCompare(b.id);
          break;

        case "status":
          comparison = a.status.localeCompare(b.status);
          break;

        case "speed":
          comparison = a.speed - b.speed;
          break;

        case "lastUpdated":
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;

        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [vehicles, sortColumn, sortDirection]);

  const renderSortIndicator = (column: keyof Vehicle) => {
    if (sortColumn !== column) return null;

    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className='max-h-[600px] overflow-auto rounded-xl border border-slate-700'>
      <table className='min-w-full table-fixed text-sm'>
        <thead>
          <tr>
            <th className={headerClass} onClick={() => handleSort("name")}>
              Vehicle{renderSortIndicator("name")}
            </th>

            <th className={headerClass} onClick={() => handleSort("id")}>
              ID{renderSortIndicator("id")}
            </th>

            <th className={headerClass} onClick={() => handleSort("status")}>
              Status{renderSortIndicator("status")}
            </th>

            <th className={headerClass} onClick={() => handleSort("speed")}>
              Speed{renderSortIndicator("speed")}
            </th>

            <th className={headerClass} onClick={() => handleSort("lastUpdated")}>
              Last Updated{renderSortIndicator("lastUpdated")}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedVehicles.map(vehicle => (
            <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleDataTable;

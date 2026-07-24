import type { Vehicle } from "../types/vehicle";

export function exportVehiclesToCSV(vehicles: Vehicle[]) {
  if (vehicles.length === 0) {
    alert("No vehicles available to export.");
    return;
  }

  const headers = [
    "Vehicle Name",
    "Vehicle ID",
    "Status",
    "Speed",
    "Heading",
    "Latitude",
    "Longitude",
    "Last Updated",
  ];

  const rows = vehicles.map((vehicle) => [
    vehicle.name,
    vehicle.id,
    vehicle.status,
    vehicle.speed,
    vehicle.heading,
    vehicle.latitude,
    vehicle.longitude,
    vehicle.lastUpdated,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const date = new Date().toISOString().split("T")[0];

  link.href = url;
  link.download = `fleet_vehicles_${date}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
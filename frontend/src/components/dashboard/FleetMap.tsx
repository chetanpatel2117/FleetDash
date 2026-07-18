import { MapContainer, TileLayer } from "react-leaflet";

import type { Vehicle } from "../../types/vehicle";
import VehicleMarkers from "./VehicleMarkers";

interface FleetMapProps {
  vehicles: Vehicle[];
}

function FleetMap ({ vehicles }: FleetMapProps) {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 overflow-hidden'>
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        scrollWheelZoom={true}
        className='h-[500px] w-full'
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <VehicleMarkers vehicles={vehicles} />;
      </MapContainer>
    </div>
  );
}

export default FleetMap;

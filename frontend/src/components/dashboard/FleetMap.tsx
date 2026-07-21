import { MapContainer, TileLayer } from "react-leaflet";
import type { Vehicle } from "../../types/vehicle";
import CanvasLayer from "./CanvasLayer";

interface FleetMapProps {
  vehicles: Vehicle[];
}

function FleetMap({ vehicles }: FleetMapProps) {
  return (
    <div className='relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800'>
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        scrollWheelZoom={true}
        className='h-[860px] w-full'
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <CanvasLayer />
      </MapContainer>
    </div>
  );
}

export default FleetMap;

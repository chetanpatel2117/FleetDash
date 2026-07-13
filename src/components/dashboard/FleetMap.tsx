import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useVehicles } from "../../hooks/useVehicles";
import { vehicleIcon } from "../../utils/markerIcons";

function FleetMap () {
  const { vehicles, setSelectedVehicle } = useVehicles();

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
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude, vehicle.longitude]}
            icon={vehicleIcon}
            eventHandlers={{
              click: () => {
                setSelectedVehicle(vehicle);
              },
            }}
          >
            <Popup>
              <div className='space-y-1'>
                <h3 className='font-semibold'>{vehicle.name}</h3>

                <p>Status: {vehicle.status}</p>

                <p>Speed: {vehicle.speed} km/h</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default FleetMap;

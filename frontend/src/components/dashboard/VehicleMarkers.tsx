import { Marker, Popup } from "react-leaflet";
import type { Vehicle } from "../../types/vehicle";
import { vehicleIcon } from "../../utils/markerIcons";
import { useVehicles } from "../../hooks/useVehicles";

interface VehicleMarkersProps {
  vehicles: Vehicle[];
}

function VehicleMarkers ({ vehicles }: VehicleMarkersProps) {
  const { setSelectedVehicle } = useVehicles();

  return (
    <>
      {vehicles.map(vehicle => (
        <Marker
          key={vehicle.id}
          position={[vehicle.latitude, vehicle.longitude]}
          icon={vehicleIcon}
          eventHandlers={{
            click: () => setSelectedVehicle(vehicle),
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
    </>
  );
}

export default VehicleMarkers;

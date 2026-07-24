import type { Vehicle } from "../../types/vehicle";

import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { useEffect } from "react";

import CanvasLayer from "./CanvasLayer";

import { useSelectedVehicle } from "../../hooks/useSelectedVehicle";

import { useFollowVehicle } from "../../hooks/useFollowVehicle";

import MapControls from "../../map/MapControls";

import RouteReplayLayer from "../../map/RouteReplayLayer";
import RouteReplayControls from "../../map/RouteReplayControls";
import ReplayVehicleMarker from "../../map/ReplayVehicleMarker";

interface FleetMapProps {
  vehicles: Vehicle[];
}

function FollowSelectedVehicle () {
  const map = useMap();

  const selectedVehicle = useSelectedVehicle();

  const { follow } = useFollowVehicle();

  useEffect(() => {
    if (!follow || !selectedVehicle) return;

    map.flyTo([selectedVehicle.latitude, selectedVehicle.longitude], map.getZoom(), {
      duration: 1,
    });
  }, [follow, selectedVehicle, map]);

  return null;
}

function FleetMap ({ vehicles }: FleetMapProps) {
  return (
    <div
      className='
      h-full 
      w-full 
      min-w-0 
      overflow-hidden 
      rounded-lg
    '
    >
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom
        className='
          h-full
          w-full
        '
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='
          https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          '
        />

        <CanvasLayer vehicles={vehicles} />

        <MapControls />

        <FollowSelectedVehicle />
        <RouteReplayLayer />
        <RouteReplayControls />
        <ReplayVehicleMarker />
      </MapContainer>
    </div>
  );
}

export default FleetMap;

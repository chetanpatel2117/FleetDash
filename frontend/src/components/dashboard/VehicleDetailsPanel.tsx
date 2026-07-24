import { useSelectedVehicle } from "../../hooks/useSelectedVehicle";
import { useFollowVehicle } from "../../hooks/useFollowVehicle";
import VehicleLiveStatus from "../vehicles/VehicleLiveStatus";
import { useRouteReplay } from "../../hooks/useRouteReplay";

function VehicleDetailsPanel () {
  const selectedVehicle = useSelectedVehicle();

  const { follow, toggleFollow } = useFollowVehicle();

  const { showRoute, toggleRoute } = useRouteReplay();

  if (!selectedVehicle) {
    return (
      <div
        className='
        h-full
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-6
      '
      >
        <div
          className='
          flex
          h-full
          items-center
          justify-center
          text-center
        '
        >
          <div>
            <div className='mb-3 text-5xl'>🚚</div>

            <h2
              className='
              text-xl
              font-semibold
              text-white
            '
            >
              No Vehicle Selected
            </h2>

            <p
              className='
              mt-2
              text-slate-400
            '
            >
              Click any vehicle marker on the map to view live telemetry.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className='
      h-full
      overflow-y-auto
      rounded-xl
      border
      border-slate-700
      bg-slate-800
      p-6
      text-white
    '
    >
      {/* Header */}

      <div
        className='
        mb-6
        flex
        items-center
        justify-between
      '
      >
        <div>
          <h2
            className='
            text-2xl
            font-bold
          '
          >
            {selectedVehicle.name}
          </h2>
          <p
            className='
            text-sm
            text-slate-400
          '
          >
            ID: {selectedVehicle.id}
          </p>
          <button
            onClick={toggleFollow}
            className={`
              mt-3
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              transition

              ${follow ? "bg-red-500 text-white" : "bg-cyan-500 text-black"}

            `}
          >
            {follow ? "Stop Following" : "Follow Vehicle"}
          </button>
          <button
            onClick={toggleRoute}
            className='
                  mt-2
                  rounded-lg
                  bg-purple-500
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-white
                  '
          >
            {showRoute ? "Hide Route" : "View Route"}
          </button>
          
        </div>

        <span
          className={`

            rounded-full
            px-3
            py-1
            text-sm
            font-medium

            ${
              selectedVehicle.status === "moving"
                ? "bg-green-500/20 text-green-400"
                : selectedVehicle.status === "idle"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }

          `}
        >
          {selectedVehicle.status.toUpperCase()}
        </span>
      </div>

      {/* Live Status */}

      <VehicleLiveStatus lastUpdated={selectedVehicle.lastUpdated} />

      {/* Vehicle Information */}

      <Section title='🚚 Vehicle Information'>
        <Item label='Vehicle Type' value={selectedVehicle.vehicleType} />

        <Item label='Driver' value={selectedVehicle.driverName} />

        <Item label='Assigned Route' value={selectedVehicle.assignedRoute} />
      </Section>

      {/* Live Telemetry */}

      <Section title='📡 Live Telemetry'>
        <Item label='Speed' value={`${selectedVehicle.speed} km/h`} />

        <Item label='Heading' value={`${selectedVehicle.heading}°`} />

        <Item label='GPS Accuracy' value={`${selectedVehicle.gpsAccuracy} m`} />

        <Item label='Signal Strength' value={`${selectedVehicle.signalStrength}%`} />
      </Section>

      {/* Vehicle Health */}

      <Section title='🔋 Vehicle Health'>
        <Item label='Fuel' value={`${selectedVehicle.fuelLevel}%`} />

        <Item label='Battery' value={`${selectedVehicle.batteryLevel}%`} />

        <Item label='Ignition' value={selectedVehicle.ignitionStatus} />

        <Item label='Condition' value={selectedVehicle.healthStatus} />
      </Section>

      {/* Location */}

      <Section title='📍 Location'>
        <Item label='Latitude' value={selectedVehicle.latitude.toFixed(5)} />

        <Item label='Longitude' value={selectedVehicle.longitude.toFixed(5)} />

        <Item label='Destination' value={selectedVehicle.destination} />

        <Item label='ETA' value={selectedVehicle.eta} />
      </Section>
    </div>
  );
}

function Section ({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='mb-8'>
      <h3
        className='
        mb-4
        border-b
        border-slate-700
        pb-2
        text-lg
        font-semibold
        text-cyan-400
      '
      >
        {title}
      </h3>

      <div
        className='
        grid
        grid-cols-2
        gap-4
      '
      >
        {children}
      </div>
    </div>
  );
}

function Item ({ label, value }: { label: string; value?: string | number }) {
  return (
    <div
      className='
      rounded-lg
      bg-slate-900
      p-3
    '
    >
      <p
        className='
        text-xs
        uppercase
        tracking-wide
        text-slate-500
      '
      >
        {label}
      </p>

      <p
        className='
        mt-1
        font-medium
        text-white
      '
      >
        {value ?? "N/A"}
      </p>
    </div>
  );
}

export default VehicleDetailsPanel;

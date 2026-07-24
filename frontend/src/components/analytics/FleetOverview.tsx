import type { Vehicle } from "../../types/vehicle";
import AnalyticsCard from "./AnalyticsCard";

interface FleetOverviewProps {
  vehicles: Vehicle[];
}

function FleetOverview ({ vehicles }: FleetOverviewProps) {
  const totalVehicles = vehicles.length;

  const movingVehicles = vehicles.filter(v => v.status === "moving").length;

  const idleVehicles = vehicles.filter(v => v.status === "idle").length;

  const offlineVehicles = vehicles.filter(v => v.status === "offline").length;

  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold text-white'>Fleet Overview</h2>

      <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
        <AnalyticsCard
          title='Total Vehicles'
          value={totalVehicles}
          subtitle='Entire Fleet'
          color='bg-blue-500'
        />

        <AnalyticsCard
          title='Moving'
          value={movingVehicles}
          subtitle='Currently Active'
          color='bg-green-500'
        />

        <AnalyticsCard title='Idle' value={idleVehicles} subtitle='Waiting' color='bg-yellow-500' />

        <AnalyticsCard
          title='Offline'
          value={offlineVehicles}
          subtitle='Disconnected'
          color='bg-red-500'
        />
      </div>
    </section>
  );
}

export default FleetOverview;

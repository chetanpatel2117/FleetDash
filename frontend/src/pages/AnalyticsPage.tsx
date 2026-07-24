import FleetOverview from "../components/analytics/FleetOverview";
import { useVehicleContext } from "../context/VehicleContext";
import VehicleTypeChart from "../components/analytics/VehicleTypeChart";
import SpeedStatistics from "../components/analytics/SpeedStatistics";
import { getSpeedStats } from "../utils/analytics";
import HealthStatusChart from "../components/analytics/HealthStatusChart";
import { getHealthStats } from "../utils/analytics";
import PowerStatistics from "../components/analytics/PowerStatistics";
import { getPowerStats } from "../utils/analytics";
import RouteStatistics from "../components/analytics/RouteStatistics";
import { getRouteStats } from "../utils/analytics";


function AnalyticsPage () {
  const { vehicles } = useVehicleContext();

  const speedStats = getSpeedStats(vehicles);
  const healthStats = getHealthStats(vehicles);
  const powerStats = getPowerStats(vehicles);
  const routeStats = getRouteStats(vehicles);


  return (
    <div className='space-y-8 text-white'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Fleet Analytics</h1>

        <p className='mt-2 text-slate-400'>Operational insights and fleet performance metrics.</p>
      </div>
        <FleetOverview vehicles={vehicles} />
        <VehicleTypeChart vehicles={vehicles} />
        <SpeedStatistics data={speedStats} />
        <HealthStatusChart data={healthStats} />
      <PowerStatistics data={powerStats} />
      <RouteStatistics data={routeStats} />


    </div>
  );
}

export default AnalyticsPage;

import FleetMap from "./FleetMap";
import type { Vehicle } from "../../types/vehicle";

interface LiveMapCardProps {
  vehicles: Vehicle[];
}

function LiveMapCard ({ vehicles }: LiveMapCardProps) {
  return (
    <div>
      <h2 className='mb-5 text-2xl font-semibold text-white'>Live Fleet Map</h2>

      <FleetMap vehicles={vehicles} />
    </div>
  );
}

export default LiveMapCard;

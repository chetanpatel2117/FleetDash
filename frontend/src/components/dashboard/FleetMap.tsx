import type { Vehicle } from "../../types/vehicle";
import CanvasMap from "./CanvasMap";

interface FleetMapProps {
  vehicles: Vehicle[];
}

function FleetMap({ vehicles }: FleetMapProps) {
  return (
    <div className='overflow-hidden rounded-xl border border-slate-700 bg-slate-800'>
      <CanvasMap vehicles={vehicles} />
    </div>
  );
}

export default FleetMap;

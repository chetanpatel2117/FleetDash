import { generateVehicles } from "../../utils/vehicleGenerator";
import {updateVehicles} from "../../store/vehicleStore";

export default function PerformanceControls () {
  const loadVehicles = (count: number) => {
    const vehicles = generateVehicles(count);

    updateVehicles(vehicles);

    console.log(`Loaded ${count} vehicles`);
  };

  return (
    <div className='fixed top-20 right-5 z-50 flex gap-2'>
      <button onClick={() => loadVehicles(1000)} className='bg-cyan-600 px-3 py-2 rounded'>
        1K
      </button>

      <button onClick={() => loadVehicles(5000)} className='bg-cyan-600 px-3 py-2 rounded'>
        5K
      </button>

      <button onClick={() => loadVehicles(10000)} className='bg-cyan-600 px-3 py-2 rounded'>
        10K
      </button>
    </div>
  );
}

import { useMap } from "react-leaflet";
import { LocateFixed, Plus, Minus } from "lucide-react";

function MapControls () {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const resetView = () => {
    map.setView([11.0168, 76.9558], 13);
  };

  return (
    <div
      className='
        absolute
        right-4
        top-4
        z-[1000]
        flex
        flex-col
        gap-2
      '
    >
      <button
        onClick={zoomIn}
        className='
          rounded-lg
          bg-slate-900
          p-2
          text-white
          border
          border-slate-700
          hover:bg-slate-700
        '
      >
        <Plus size={18} />
      </button>

      <button
        onClick={zoomOut}
        className='
          rounded-lg
          bg-slate-900
          p-2
          text-white
          border
          border-slate-700
          hover:bg-slate-700
        '
      >
        <Minus size={18} />
      </button>

      <button
        onClick={resetView}
        className='
          rounded-lg
          bg-cyan-500
          p-2
          text-black
          hover:bg-cyan-400
        '
      >
        <LocateFixed size={18} />
      </button>
    </div>
  );
}

export default MapControls;

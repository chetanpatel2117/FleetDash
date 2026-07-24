import { pauseReplay, resetReplay, setReplaySpeed, startReplay } from "../store/routeStore";

function RouteReplayControls () {
  return (
    <div
      className='absolute bottom-4 left-1/2 -translate-x-1/2 
                    bg-white rounded-lg shadow-md p-3 
                    flex items-center gap-3 z-[1000]'
    >
      <button
  onClick={() => {
    console.log("PLAY BUTTON CLICKED");
    startReplay();
  }}
  className='px-3 py-1 rounded bg-green-500 text-white'
>
  ▶ Play
</button>;


      <button onClick={pauseReplay} className='px-3 py-1 rounded bg-yellow-500 text-white'>
        ⏸ Pause
      </button>

      <button onClick={resetReplay} className='px-3 py-1 rounded bg-gray-500 text-white'>
        ↻ Reset
      </button>

      <select
        onChange={e => setReplaySpeed(Number(e.target.value))}
        defaultValue='1'
        className='border rounded px-2 py-1'
      >
        <option value='1'>1x</option>

        <option value='2'>2x</option>

        <option value='5'>5x</option>
      </select>
    </div>
  );
}

export default RouteReplayControls;

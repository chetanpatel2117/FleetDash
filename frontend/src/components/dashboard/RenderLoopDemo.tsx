import { useState } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

function RenderLoopDemo () {
  const [frames, setFrames] = useState(0);

  useAnimationFrame(() => {
    setFrames(prev => prev + 1);
  });

  return (
    <div className='rounded-xl bg-slate-800 p-6 border border-slate-700'>
      <h2 className='text-xl font-semibold text-white'>Render Loop Demo</h2>

      <p className='mt-4 text-cyan-400 text-3xl'>{frames}</p>

      <p className='text-slate-400 mt-2'>Frames rendered</p>
    </div>
  );
}

export default RenderLoopDemo;

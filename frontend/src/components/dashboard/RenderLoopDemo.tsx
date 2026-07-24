import { Cpu } from "lucide-react";
import { useState } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

function RenderLoopDemo () {
  const [frames, setFrames] = useState(0);

  useAnimationFrame(() => {
    setFrames(prev => prev + 1);
  });

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-5'>
      <div className='flex items-center gap-2 mb-4'>
        <Cpu className='h-5 w-5 text-cyan-400' />

        <h2 className='text-xl font-semibold text-white'>Render Loop</h2>
      </div>

      <div className='rounded-lg bg-slate-900 py-6 text-center'>
        <p className='text-4xl font-bold text-cyan-400'>{frames}</p>

        <p className='mt-2 text-sm text-slate-400'>Frames Rendered</p>
      </div>
    </div>
  );
}

export default RenderLoopDemo;

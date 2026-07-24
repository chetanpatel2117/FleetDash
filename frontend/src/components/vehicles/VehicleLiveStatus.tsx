import { useEffect, useState } from "react";

interface VehicleLiveStatusProps {
  lastUpdated: string;
}

function VehicleLiveStatus ({ lastUpdated }: VehicleLiveStatusProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updatedTime = new Date(lastUpdated).getTime();

  const secondsAgo = Math.floor((currentTime - updatedTime) / 1000);

  const isLive = secondsAgo >= 0 && secondsAgo < 10;

  return (
    <div className='mb-6 rounded-lg bg-slate-900 p-4'>
      <div className='flex items-center gap-3'>
        <span className={`h-3 w-3 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"}`} />

        <span className='font-semibold'>{isLive ? "LIVE" : "OFFLINE"}</span>
      </div>

      <p className='mt-2 text-sm text-slate-400'>
        Last update: {secondsAgo >= 0 ? `${secondsAgo}s ago` : "Unknown"}
      </p>
    </div>
  );
}

export default VehicleLiveStatus;

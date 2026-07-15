import { useVehicles } from "../../hooks/useVehicles";

function VehicleDetailsPanel () {
  const { selectedVehicle } = useVehicles();

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-6'>
      <h2 className='mb-6 text-2xl font-semibold text-white'>Vehicle Details</h2>

      {!selectedVehicle ? (
        <div className='flex h-64 items-center justify-center'>
          <p className='text-slate-400'>Select a vehicle on the map.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          <DetailRow label='Vehicle' value={selectedVehicle.name} />
          <DetailRow label='Status' value={selectedVehicle.status} />
          <DetailRow label='Speed' value={`${selectedVehicle.speed} km/h`} />
          <DetailRow label='Heading' value={`${selectedVehicle.heading}°`} />
          <DetailRow label='Latitude' value={selectedVehicle.latitude.toFixed(4)} />
          <DetailRow label='Longitude' value={selectedVehicle.longitude.toFixed(4)} />
          <DetailRow
            label='Updated'
            value={new Date(selectedVehicle.lastUpdated).toLocaleTimeString()}
          />
        </div>
      )}
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow ({ label, value }: DetailRowProps) {
  return (
    <div className='flex justify-between border-b border-slate-700 pb-2'>
      <span className='text-slate-400'>{label}</span>

      <span className='font-medium text-white'>{value}</span>
    </div>
  );
}

export default VehicleDetailsPanel;

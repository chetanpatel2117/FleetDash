const activities = [
  {
    id: 1,
    vehicle: "Truck-102",
    event: "Trip Started",
    time: "10:15 AM",
  },
  {
    id: 2,
    vehicle: "Truck-208",
    event: "Entered Geofence",
    time: "10:12 AM",
  },
  {
    id: 3,
    vehicle: "Truck-054",
    event: "Overspeed Detected",
    time: "10:09 AM",
  },
  {
    id: 4,
    vehicle: "Truck-301",
    event: "Delivery Completed",
    time: "09:58 AM",
  },
];

function FleetActivity () {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm'>
      <h2 className='mb-6 text-xl font-semibold text-white'>Fleet Activity</h2>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-700 text-left text-slate-400'>
              <th className='pb-3'>Vehicle</th>
              <th className='pb-3'>Activity</th>
              <th className='pb-3'>Time</th>
            </tr>
          </thead>

          <tbody>
            {activities.map(activity => (
              <tr key={activity.id} className='border-b border-slate-700 last:border-none'>
                <td className='py-4 font-medium text-white'>{activity.vehicle}</td>

                <td className='py-4 text-slate-300'>{activity.event}</td>

                <td className='py-4 text-slate-400'>{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetActivity;

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RouteStatisticsProps {
  data: {
    routes: {
      route: string;
      count: number;
    }[];
    totalRoutes: number;
    averageVehiclesPerRoute: number;
    busiestRoute: {
      route: string;
      count: number;
    };
  };
}

function RouteStatistics ({ data }: RouteStatisticsProps) {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg'>
      <h2 className='mb-4 text-lg font-semibold text-white'>Route Statistics</h2>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div>
          <p className='text-sm text-slate-400'>Total Routes</p>

          <p className='text-2xl font-bold text-cyan-400'>{data.totalRoutes}</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Avg Vehicles / Route</p>

          <p className='text-2xl font-bold text-emerald-400'>{data.averageVehiclesPerRoute}</p>
        </div>

        <div>
          <p className='text-sm text-slate-400'>Busiest Route</p>

          <p className='text-lg font-bold text-yellow-400'>{data.busiestRoute.route}</p>
        </div>
      </div>

      <div className='h-72'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data.routes}>
            <XAxis dataKey='route' stroke='#94a3b8' />

            <YAxis stroke='#94a3b8' />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
              }}
            />

            <Bar dataKey='count' fill='#22c55e' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RouteStatistics;

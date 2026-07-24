import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface HealthStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#22c55e", // Healthy
  "#eab308", // Warning
  "#ef4444", // Critical
];

function HealthStatusChart ({ data }: HealthStatusChartProps) {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg'>
      <h2 className='mb-5 text-lg font-semibold text-white'>Vehicle Health Status</h2>

      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                color: "#ffffff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HealthStatusChart;

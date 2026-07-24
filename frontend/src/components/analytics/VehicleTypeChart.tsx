import type { Vehicle } from "../../types/vehicle";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface VehicleTypeChartProps {
  vehicles: Vehicle[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

function VehicleTypeChart ({ vehicles }: VehicleTypeChartProps) {
  const vehicleTypeCounts = vehicles.reduce<Record<string, number>>((acc, vehicle) => {
    acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(vehicleTypeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 shadow'>
      <h2 className='mb-6 text-xl font-semibold text-white'>Vehicle Type Distribution</h2>

      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie data={chartData} dataKey='value' nameKey='name' outerRadius={100} label>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VehicleTypeChart;

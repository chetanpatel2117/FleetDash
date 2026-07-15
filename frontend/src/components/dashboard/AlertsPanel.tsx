import { TriangleAlert } from "lucide-react";

const alerts = [
  {
    id: 1,
    vehicle: "Truck-102",
    message: "Entered restricted zone",
    severity: "High",
  },
  {
    id: 2,
    vehicle: "Truck-208",
    message: "Overspeed detected",
    severity: "Medium",
  },
  {
    id: 3,
    vehicle: "Truck-054",
    message: "Engine idle too long",
    severity: "Low",
  },
];

function AlertsPanel () {
  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm'>
      <h2 className='mb-6 text-xl font-semibold text-white'>Recent Alerts</h2>

      <div className='space-y-4'>
        {alerts.map(alert => (
          <div key={alert.id} className='flex items-start gap-4 rounded-lg bg-slate-900 p-4'>
            <TriangleAlert className='mt-1 text-yellow-500' size={20} />

            <div className='flex-1'>
              <h3 className='font-medium text-white'>{alert.vehicle}</h3>

              <p className='text-sm text-slate-400'>{alert.message}</p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                alert.severity === "High"
                  ? "bg-red-500/20 text-red-400"
                  : alert.severity === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsPanel;

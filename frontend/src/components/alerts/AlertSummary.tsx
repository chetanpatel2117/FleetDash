import { AlertTriangle, ShieldAlert, Info } from "lucide-react";

import type { VehicleAlert } from "../../types/alert";

interface AlertSummaryProps {
  alerts: VehicleAlert[];
}

function AlertSummary ({ alerts }: AlertSummaryProps) {
  const totalAlerts = alerts.length;

  const criticalAlerts = alerts.filter(alert => alert.severity === "critical").length;

  const warningAlerts = alerts.filter(alert => alert.severity === "warning").length;

  const infoAlerts = alerts.filter(alert => alert.severity === "info").length;

  const cards = [
    {
      title: "Total Alerts",
      value: totalAlerts,
      icon: <AlertTriangle size={22} />,
      style: "text-cyan-400",
    },

    {
      title: "Critical",
      value: criticalAlerts,
      icon: <ShieldAlert size={22} />,
      style: "text-red-400",
    },

    {
      title: "Warning",
      value: warningAlerts,
      icon: <AlertTriangle size={22} />,
      style: "text-yellow-400",
    },

    {
      title: "Info",
      value: infoAlerts,
      icon: <Info size={22} />,
      style: "text-blue-400",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
      {cards.map(card => (
        <div
          key={card.title}
          className='
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              p-5
              shadow-lg
            '
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-400'>{card.title}</p>

              <p className={`text-3xl font-bold ${card.style}`}>{card.value}</p>
            </div>

            <div className={card.style}>{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlertSummary;

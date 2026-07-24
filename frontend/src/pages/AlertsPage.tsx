import { useState } from "react";
import { AlertTriangle, BatteryLow, Gauge, WifiOff, Fuel, MapPin, HeartPulse } from "lucide-react";

import { useVehicleContext } from "../context/VehicleContext";
import { generateAlerts } from "../utils/alertEngine";
import AlertSummary from "../components/alerts/AlertSummary";

function AlertsPage () {
  const { vehicles } = useVehicleContext();

  const alerts = generateAlerts(vehicles);

  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const [search, setSearch] = useState("");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filter === "all" || alert.severity === filter;

    const matchesSearch = alert.message.toLowerCase().includes(search.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  const getIcon = (type: string) => {
  switch (type) {
    case "overspeed":
      return <Gauge size={20} />;

    case "low_fuel":
      return <Fuel size={20} />;

    case "low_battery":
      return <BatteryLow size={20} />;

    case "offline":
      return <WifiOff size={20} />;

    case "gps_issue":
      return <MapPin size={20} />;

    case "health_issue":
      return <HeartPulse size={20} />;

    default:
      return <AlertTriangle size={20} />;
  }
};


  const getColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-500/10";

      case "warning":
        return "border-yellow-500 bg-yellow-500/10";

      default:
        return "border-cyan-500 bg-cyan-500/10";
    }
  };

  return (
    <div className='p-6 text-white'>
      {/* Header */}

      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Alerts</h1>

        <p className='text-slate-400'>Vehicle telemetry warnings and critical events</p>
      </div>

      {/* Search + Filters */}

      <div className='flex flex-wrap gap-3 mb-6'>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search vehicle...'
          className='
            rounded-lg
            bg-slate-800
            border
            border-slate-700
            px-4
            py-2
            text-white
            outline-none
          '
        />

        {["all", "critical", "warning", "info"].map(item => (
          <button
            key={item}
            onClick={() => setFilter(item as "all" | "critical" | "warning" | "info")}
            className={`
                px-4
                py-2
                rounded-lg
                border
                ${
                  filter === item
                    ? "bg-cyan-500 text-black border-cyan-500"
                    : "bg-slate-900 border-slate-700 text-white"
                }
              `}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Summary Cards */}

      <AlertSummary alerts={alerts} />

      {/* Alert List */}

      <div className='grid gap-4'>
        {filteredAlerts.length === 0 ? (
          <div
            className='
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                p-6
                text-center
              '
          >
            <p className='text-emerald-400'>No alerts found</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`
                  rounded-xl
                  border
                  p-4
                  ${getColor(alert.severity)}
                `}
            >
              <div className='flex items-center gap-4'>
  <div>{getIcon(alert.type)}</div>

  <div className='flex-1'>
    <h3 className='font-semibold text-lg'>{alert.type.replace("_", " ").toUpperCase()}</h3>

    <p className='text-cyan-400 text-sm'>Vehicle: {alert.vehicleName}</p>

    <p className='text-slate-300'>{alert.message}</p>

    <p className='text-xs text-slate-500 mt-1'>{new Date(alert.timestamp).toLocaleTimeString()}</p>
  </div>

  <span
    className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold

      ${
        alert.severity === "critical"
          ? "bg-red-500/20 text-red-400"
          : alert.severity === "warning"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-cyan-500/20 text-cyan-400"
      }
    `}
  >
    {alert.severity.toUpperCase()}
  </span>
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertsPage;

interface VehicleStatusBadgeProps {
  status: "moving" | "idle" | "offline";
}

function VehicleStatusBadge ({ status }: VehicleStatusBadgeProps) {
  const styles = {
    moving: {
      label: "Moving",
      className: "bg-green-500/10 text-green-400 border-green-500/20",
    },

    idle: {
      label: "Idle",
      className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },

    offline: {
      label: "Offline",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const current = styles[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
}

export default VehicleStatusBadge;

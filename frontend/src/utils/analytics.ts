import type { Vehicle } from "../types/vehicle";


export function getSpeedStats(vehicles: Vehicle[]) {
  if (vehicles.length === 0) {
    return {
      averageSpeed: 0,
      maxSpeed: 0,
      minSpeed: 0,
      movingPercentage: 0,
    };
  }

  const speeds = vehicles.map((v) => v.speed);

  const totalSpeed = speeds.reduce(
    (sum, speed) => sum + speed,
    0
  );

  const movingVehicles = vehicles.filter(
    (v) => v.speed > 0
  ).length;

  return {
    averageSpeed: Math.round(totalSpeed / vehicles.length),
    maxSpeed: Math.max(...speeds),
    minSpeed: Math.min(...speeds),
    movingPercentage: Math.round(
      (movingVehicles / vehicles.length) * 100
    ),
  };
}


export function getHealthStats(vehicles: Vehicle[]) {
  const health = {
    Healthy: 0,
    Warning: 0,
    Critical: 0,
  };

  vehicles.forEach((vehicle) => {
    if (vehicle.healthStatus === "Good") {
      health.Healthy++;
    }

    if (vehicle.healthStatus === "Warning") {
      health.Warning++;
    }

    if (vehicle.healthStatus === "Critical") {
      health.Critical++;
    }
  });

  return [
    {
      name: "Good",
      value: health.Healthy,
    },
    {
      name: "Warning",
      value: health.Warning,
    },
    {
      name: "Critical",
      value: health.Critical,
    },
  ];
}


export function getPowerStats(vehicles: Vehicle[]) {

  if (vehicles.length === 0) {
    return {
      averageFuel: 0,
      averageBattery: 0,
      averageSignal: 0,
      lowFuelVehicles: 0,
      lowBatteryVehicles: 0,
    };
  }


  const totalFuel = vehicles.reduce(
    (sum, v) => sum + v.fuelLevel,
    0
  );


  const totalBattery = vehicles.reduce(
    (sum, v) => sum + v.batteryLevel,
    0
  );


  const totalSignal = vehicles.reduce(
    (sum, v) => sum + v.signalStrength,
    0
  );


  return {
    averageFuel: Math.round(
      totalFuel / vehicles.length
    ),

    averageBattery: Math.round(
      totalBattery / vehicles.length
    ),

    averageSignal: Math.round(
      totalSignal / vehicles.length
    ),

    lowFuelVehicles: vehicles.filter(
      (v) => v.fuelLevel < 20
    ).length,


    lowBatteryVehicles: vehicles.filter(
      (v) => v.batteryLevel < 20
    ).length,
  };
}


export function getRouteStats(vehicles: Vehicle[]) {
  const routeMap: Record<string, number> = {};

  vehicles.forEach((vehicle) => {
    const route = vehicle.assignedRoute || "Unknown";

    if (!routeMap[route]) {
      routeMap[route] = 0;
    }

    routeMap[route]++;
  });

  const routes = Object.entries(routeMap).map(([route, count]) => ({
    route,
    count,
  }));

  const totalRoutes = routes.length;

  const averageVehiclesPerRoute =
    totalRoutes > 0
      ? Math.round(vehicles.length / totalRoutes)
      : 0;

  const busiestRoute =
    routes.sort((a, b) => b.count - a.count)[0] || {
      route: "N/A",
      count: 0,
    };

  return {
    routes,
    totalRoutes,
    averageVehiclesPerRoute,
    busiestRoute,
  };
}
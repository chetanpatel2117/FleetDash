interface Coordinate {
  lat: number;
  lng: number;
}

const vehicleHistory = new Map<string, Coordinate[]>();

const MAX_HISTORY_POINTS = 50;

export function addHistory(
  vehicleId: string,
  coordinate: Coordinate
) {
  const history = vehicleHistory.get(vehicleId) ?? [];

  history.push(coordinate);

  if (history.length > MAX_HISTORY_POINTS) {
    history.shift();
  }

    vehicleHistory.set(vehicleId, history);
}

export function getHistory(vehicleId: string): Coordinate[] {
  return vehicleHistory.get(vehicleId) ?? [];
}


export function clearHistory(vehicleId: string) {
  vehicleHistory.delete(vehicleId);
}

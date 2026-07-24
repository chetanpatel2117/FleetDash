export interface HistoryPoint {
  lat: number;
  lng: number;
  timestamp: number;
}


const vehicleHistory = new Map<string, HistoryPoint[]>();

const subscribers = new Set<() => void>();

const MAX_HISTORY_POINTS = 200;


export function addHistory(
  vehicleId: string,
  coordinate: {
    lat: number;
    lng: number;
  }
) {

  const history = vehicleHistory.get(vehicleId) ?? [];


  history.push({
    lat: coordinate.lat,
    lng: coordinate.lng,
    timestamp: Date.now(),
  });


  if (history.length > MAX_HISTORY_POINTS) {
    history.shift();
  }


  vehicleHistory.set(
    vehicleId,
    history
  );


  notify();
}


export function getHistory(
  vehicleId: string
): HistoryPoint[] {

  return vehicleHistory.get(vehicleId) ?? [];

}



export function subscribeHistory(
  callback: () => void
) {

  subscribers.add(callback);


  return () => {
    subscribers.delete(callback);
  };

}



function notify() {

  subscribers.forEach(
    callback => callback()
  );

}



export function clearHistory(
  vehicleId?: string
) {

  if (vehicleId) {

    vehicleHistory.delete(vehicleId);

  } else {

    vehicleHistory.clear();

  }


  notify();

}


export function clearAllHistory() {
  vehicleHistory.clear();
}
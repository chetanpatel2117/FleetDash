interface RouteState {
  showRoute: boolean;
  isPlaying: boolean;
  currentIndex: number;
  speed: number;
}


let routeState: RouteState = {
  showRoute: false,
  isPlaying: false,
  currentIndex: 0,
  speed: 1,
};


const subscribers = new Set<() => void>();


function notify() {

  subscribers.forEach(
    callback => callback()
  );

}


// =========================
// Existing Route Visibility
// =========================

export function getShowRoute() {

  return routeState.showRoute;

}


export function setShowRoute(
  value: boolean
) {

  routeState = {
    ...routeState,
    showRoute: value,
  };

  notify();

}


export function subscribeRouteStore(
  callback: () => void
) {

  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };

}


// =========================
// Replay State
// =========================

export function getRouteState() {

  return routeState;

}


export function subscribeRoute(
  callback: () => void
) {

  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };

}



export function startReplay() {

  console.log("START REPLAY");

  routeState = {
    ...routeState,
    isPlaying: true,
  };

  console.log(routeState);

  notify();

}



export function pauseReplay() {

  routeState = {
    ...routeState,
    isPlaying: false,
  };

  notify();

}



export function resetReplay() {

  routeState = {
    ...routeState,
    currentIndex: 0,
    isPlaying: false,
  };

  notify();

}



export function setReplaySpeed(
  speed: number
) {

  routeState = {
    ...routeState,
    speed,
  };

  notify();

}



export function setReplayIndex(
  index: number
) {

  routeState = {
    ...routeState,
    currentIndex: index,
  };

  notify();

}
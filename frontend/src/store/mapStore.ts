type Listener = () => void;

let followVehicle = false;

const listeners = new Set<Listener>();


export function setFollowVehicle(value:boolean){

  followVehicle = value;

  listeners.forEach(listener => listener());

}


export function getFollowVehicle(){

  return followVehicle;

}


export function subscribeMapStore(
  listener:Listener
){

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };

}
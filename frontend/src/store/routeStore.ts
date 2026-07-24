let showRoute = false;

const listeners = new Set<()=>void>();


export function setShowRoute(value:boolean){

  showRoute = value;

  listeners.forEach(listener=>listener());

}



export function getShowRoute(){

  return showRoute;

}



export function subscribeRouteStore(
  listener:()=>void
){

  listeners.add(listener);


  return ()=>{

    listeners.delete(listener);

  };

}
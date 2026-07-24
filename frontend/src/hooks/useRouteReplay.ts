import { useSyncExternalStore } from "react";

import {
  getShowRoute,
  setShowRoute,
  subscribeRouteStore
} from "../store/routeStore";


export function useRouteReplay(){


  const showRoute = useSyncExternalStore(
    subscribeRouteStore,
    getShowRoute
  );


  function toggleRoute(){

    setShowRoute(!showRoute);

  }


  return {
    showRoute,
    toggleRoute
  };

}
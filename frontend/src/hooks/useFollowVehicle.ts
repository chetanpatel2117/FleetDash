import { useSyncExternalStore } from "react";
import {
  getFollowVehicle,
  setFollowVehicle,
  subscribeMapStore
} from ".././store/mapStore";


export function useFollowVehicle(){

  const follow = useSyncExternalStore(
    subscribeMapStore,
    getFollowVehicle
  );


  function toggleFollow(){

    setFollowVehicle(!follow);

  }


  return {
    follow,
    toggleFollow
  };

}
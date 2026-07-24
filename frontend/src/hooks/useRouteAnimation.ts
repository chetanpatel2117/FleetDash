import { useEffect, useState } from "react";

import {
  getRouteState,
  setReplayIndex,
  subscribeRoute
} from "../store/routeStore";


export function useRouteAnimation(
  totalPoints: number
) {

  const [, forceUpdate] = useState(0);


  useEffect(() => {

    return subscribeRoute(() => {
      forceUpdate(
        value => value + 1
      );
    });

  }, []);



  useEffect(() => {

    console.log(
      "Animation started",
      totalPoints
    );


    const timer = setInterval(() => {

      const state = getRouteState();


      console.log(
        "Replay tick:",
        state
      );


      if (
        state.isPlaying &&
        totalPoints > 0
      ) {

        let nextIndex =
          state.currentIndex + state.speed;


        if (
          nextIndex >= totalPoints
        ) {
          nextIndex = 0;
        }


        setReplayIndex(
          nextIndex
        );

      }


    }, 1000);



    return () => {
      clearInterval(timer);
    };


  }, [totalPoints]);



  return getRouteState();

}
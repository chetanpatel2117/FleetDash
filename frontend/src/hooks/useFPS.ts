import { useEffect, useState } from "react";


export function useFPS() {


    const [fps, setFPS] = useState(0);

    const [frameTime, setFrameTime] = useState(0);



    useEffect(()=>{


        let frames = 0;

        let lastTime = performance.now();


        let animationId:number;



        const measure = ()=>{


            const now =
                performance.now();


            frames++;



            const delta =
                now - lastTime;



            if(delta >= 1000){


                setFPS(frames);



                setFrameTime(
                    delta / frames
                );



                frames = 0;

                lastTime = now;


            }



            animationId =
                requestAnimationFrame(
                    measure
                );


        };



        animationId =
            requestAnimationFrame(
                measure
            );



        return ()=>{

            cancelAnimationFrame(
                animationId
            );

        };


    },[]);



    return {
        fps,
        frameTime
    };

}
import { useRef, useEffect } from "react";

function useInterval(callback, delay) {
  // console.log(delay, callback)
  const savedCallback = useRef();

  useEffect(()=> {
    savedCallback.current = callback;
  });

  useEffect(()=> {

    function tick(){
      savedCallback.current();
    }

    if(delay !== null) {
      let id = setInterval(tick , delay);
      return () => clearInterval(id);
    }

    return savedCallback.current;
  },[delay]);

}

export default useInterval;
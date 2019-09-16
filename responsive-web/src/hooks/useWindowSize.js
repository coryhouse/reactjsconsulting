import { useState, useEffect } from "react";
import { debounce } from "../utils/debounce";

const useWindowSize = lag => {
  const [windowSize, getWindowSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  useEffect(() => {
    const handleResize = debounce((lag = 100) => {
      getWindowSize({
        w: window.innerWidth,
        h: window.innerHeight
      });
    }, lag);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lag]);
  return windowSize;
};

export default useWindowSize;

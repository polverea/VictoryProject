import { useCallback, useEffect, useRef, useState } from "react";

export function useGameTime({ onTick: handleTick, speed }) {
  const timeInterval = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTime = useCallback(() => {
    timeInterval.current = setInterval(() => {
      handleTick();
    }, speed);
    setIsRunning(true);
  }, [handleTick, speed]);

  const stopTime = useCallback(() => {
    clearInterval(timeInterval.current);
    timeInterval.current = null;
    setIsRunning(false);
  }, [timeInterval]);

  useEffect(() => {
    if (!isRunning) return;
    stopTime();
    startTime();
  }, [speed, startTime, stopTime, isRunning]);

  return { isRunning, startTime, stopTime };
}

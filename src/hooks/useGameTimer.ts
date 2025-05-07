import { useState, useEffect } from "react";

import { GameStatus } from "../types/gameStatus";

export const useGameTimer = (
  gameStatus: GameStatus,
  startTime: number | undefined
) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (gameStatus !== GameStatus.Playing || startTime === undefined) return;
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStatus, startTime]);

  const resetElapsedTime = () => {
    setElapsedTime(0);
  };

  return { elapsedTime, resetElapsedTime };
};

import type { GameSettings } from "../types/gameSettings.ts";

export const checkGameSettings = (settings: GameSettings): boolean => {
  const { rows, cols, mines } = settings;
  if (rows <= 0 || cols <= 0 || mines <= 0 || mines > rows * cols) {
    return false;
  }
  return true;
};

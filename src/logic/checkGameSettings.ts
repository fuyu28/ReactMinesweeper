import type { GameSettings } from "../types/gameSettings.ts";

export const checkGameSettings = (settings: GameSettings): boolean => {
  const { rows, cols, mines, excludeCells } = settings;
  if (
    rows <= 0 ||
    cols <= 0 ||
    mines <= 0 ||
    excludeCells < 0 ||
    mines > rows * cols ||
    excludeCells > rows * cols - mines
  ) {
    return false;
  }
  return true;
};

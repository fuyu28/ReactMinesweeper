import type { GameSettings } from "../types/gameSettings.ts";

export const checkGameSettings = (settings: GameSettings) => {
  const { rows, cols, mines } = settings;
  if (rows <= 0 || cols <= 0 || mines <= 0) {
    return "Invalid game settings. Please adjust the settings.";
  }
  if (mines > rows * cols) {
    return "Too many mines for the board size!";
  }
  return null;
};

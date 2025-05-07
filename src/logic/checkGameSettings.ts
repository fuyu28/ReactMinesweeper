import type { GameSettings } from "../types/gameSettings.ts";

export const checkGameSettings = (
  settings: GameSettings
): { valid: boolean; message?: string } => {
  const { rows, cols, mines, excludeCells } = settings;
  const totalCells = rows * cols;

  if (rows <= 0 || cols <= 0)
    return {
      valid: false,
      message: "Rows and columns must be greater than 0.",
    };
  if (mines <= 0 || mines > totalCells)
    return {
      valid: false,
      message:
        "Mines must be greater than 0 and less than or equal to the total number of cells.",
    };
  if (excludeCells < 0 || excludeCells >= totalCells)
    return {
      valid: false,
      message:
        "Exclude cells must be greater than or equal to 0 and less than the total number of cells.",
    };
  return { valid: true };
};

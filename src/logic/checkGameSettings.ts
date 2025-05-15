import type { GameSettings } from "../types/gameSettings.ts";
import type { Lang } from "../locales/index.ts";
import { t } from "../utils/t.ts";

export const checkGameSettings = (
  settings: GameSettings,
  lang: Lang
): { valid: boolean; message?: string } => {
  const { rows, cols, mines, excludeCells } = settings;
  const totalCells = rows * cols;
  if (rows <= 0 || cols <= 0)
    return {
      valid: false,
      message: t(lang, "errors.invalidRowsCols"),
    };
  if (mines <= 0 || mines > totalCells)
    return {
      valid: false,
      message: t(lang, "errors.invalidMines"),
    };
  if (excludeCells < 0 || excludeCells >= totalCells)
    return {
      valid: false,
      message: t(lang, "errors.invalidExclude"),
    };
  if (excludeCells + mines > totalCells) {
    return {
      valid: false,
      message: t(lang, "errors.exceedTotal"),
    };
  }
  return { valid: true };
};

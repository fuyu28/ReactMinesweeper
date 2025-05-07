import type { Cell } from "../types/cell";

export function remainFlags(mineCount: number, board: Cell[][]): number {
  const flagCount = board.flat().filter((cell) => cell.isFlagged).length;
  return mineCount - flagCount;
}

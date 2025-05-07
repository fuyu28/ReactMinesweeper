import { Cell } from "../types/cell";

export function checkWin(board: Cell[][], mineCount: number): boolean {
  const totalCoveredCells = board
    .flat()
    .filter((cell) => !cell.isRevealed).length;
  return totalCoveredCells === mineCount;
}

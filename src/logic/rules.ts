import { Cell } from "../types/cell";

export function checkWin(board: Cell[][], mineCount: number): boolean {
  if (board.flat().filter((cell) => cell.isExploded).length > 0) {
    return false;
  }
  const totalCoveredCells = board
    .flat()
    .filter((cell) => !cell.isRevealed).length;
  return totalCoveredCells === mineCount;
}

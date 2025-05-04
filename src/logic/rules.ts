import { Cell } from "../types/cell";

export function checkWin(board: Cell[][], mineCount: number): boolean {
  let coveredCells = 0;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (!board[r][c].isOpen) {
        coveredCells++;
      }
    }
  }
  return coveredCells === mineCount;
}

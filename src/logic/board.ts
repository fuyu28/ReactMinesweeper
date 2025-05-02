import type { Cell } from "../types/cell.ts";

export function initializeBoard(
  rows: number,
  cols: number,
  mines: number
): Cell[][] {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      isOpen: false,
      isFlagged: false,
    }))
  );

  let placedMines = 0;
  if (mines > rows * cols) {
    throw new Error("Too many mines for the board size!");
  }
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col].value === 0) {
      board[row][col].value = -1;
      placedMines++;
    }
  }

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function isValidCell(r: number, c: number): boolean {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].value === -1) {
        continue;
      }
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (isValidCell(nr, nc) && board[nr][nc].value === -1) {
          board[r][c].value++;
        }
      }
    }
  }
  return board;
}

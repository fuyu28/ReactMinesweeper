import type { Cell } from "../types/cell.ts";
import { directions } from "../constants/directions.ts";

export function initializeBoard(
  rows: number,
  cols: number,
  mines: number,
  exclude: [number, number]
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
    if (
      (row === exclude[0] && col === exclude[1]) ||
      board[row][col].value === -1
    ) {
      continue; // Skip the cell that was clicked first
    }

    board[row][col].value = -1;
    placedMines++;
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

export function floodFill(board: Cell[][], x: number, y: number): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const visited = new Set<string>();
  const queue: [number, number][] = [[x, y]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);
    newBoard[r][c].isOpen = true;
    if (newBoard[r][c].value === 0) {
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (!newBoard[nr][nc].isOpen && !newBoard[nr][nc].isFlagged) {
            queue.push([nr, nc]);
          }
        }
      }
    }
  }
  return newBoard;
}

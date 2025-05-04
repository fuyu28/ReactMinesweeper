import type { Cell } from "../types/cell.ts";
import { directions } from "../constants/directions.ts";

function isValidCell(
  r: number,
  c: number,
  rows: number,
  cols: number
): boolean {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

export function initializeBoard(
  rows: number,
  cols: number,
  mines: number,
  exclude: [number, number][]
): Cell[][] {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      isOpen: false,
      isFlagged: false,
    }))
  );

  let placedMines = 0;
  const excludeSet = new Set<string>(
    exclude.map((cell) => `${cell[0]},${cell[1]}`)
  );
  if (mines > rows * cols) {
    throw new Error("Too many mines for the board size!");
  }
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (excludeSet.has(`${row},${col}`) || board[row][col].value === -1)
      continue; // Skip the cell that was clicked first

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

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].value === -1) continue;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (isValidCell(nr, nc, rows, cols) && board[nr][nc].value === -1) {
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

export function getSafeArea(
  r: number,
  c: number,
  rows: number,
  cols: number,
  limit: number
): [number, number][] {
  const queue: [number, number][] = [[r, c]];
  const visited = new Set<string>();
  const result: [number, number][] = [];

  while (queue.length > 0 && result.length < limit) {
    const [cr, cc] = queue.shift()!;
    const key = `${cr},${cc}`;
    if (visited.has(key)) continue;

    visited.add(key);
    result.push([cr, cc]);

    for (const [dr, dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;
      if (isValidCell(nr, nc, rows, cols) && !visited.has(`${nr},${nc}`)) {
        queue.push([nr, nc]);
      }
    }
  }
  return result;
}

import type { Board } from "../types/board.ts";
import { directions } from "../constants/directions.ts";
import { isValidCell } from "../utils/grid.ts";

export function createEmptyBoard(rows: number, cols: number): Board {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      isRevealed: false,
      isFlagged: false,
    }))
  );
}

function placeMines(
  board: Board,
  mines: number,
  excludeSet: Set<string>
): Board {
  const rows = board.length;
  const cols = board[0].length;
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (excludeSet.has(`${r},${c}`) || board[r][c].value === -1) continue;

    board[r][c].value = -1;
    placed++;
  }

  return board;
}

export function calculateCellValues(board: Board): Board {
  const rows = board.length;
  const cols = board[0].length;
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

export function initializeBoard(
  rows: number,
  cols: number,
  mines: number,
  exclude: [number, number][]
): Board {
  const board: Board = createEmptyBoard(rows, cols);
  const excludeSet = new Set(exclude.map(([r, c]) => `${r},${c}`));
  placeMines(board, mines, excludeSet);
  calculateCellValues(board);
  return board;
}

type floodFillResult = {
  board: Board;
  openCells: [number, number][];
};

export function floodFill(board: Board, x: number, y: number): floodFillResult {
  const rows = board.length;
  const cols = board[0].length;

  const newBoard = copyBoard(board);
  const visited = new Set<string>();
  const queue: [number, number][] = [[x, y]];
  const openCells: [number, number][] = [];
  if (board[x][y].value === -1)
    return { board: newBoard, openCells: openCells };

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);
    newBoard[r][c].isRevealed = true;
    openCells.push([r, c]);
    if (newBoard[r][c].value === 0) {
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isFlagged) {
            queue.push([nr, nc]);
          }
        }
      }
    }
  }
  return { board: newBoard, openCells: openCells };
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

  if (r === -1 || c === -1) {
    return result;
  }

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

export function revealAllCells(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => {
      const isFlagCorrect =
        cell.isFlagged && cell.value === -1
          ? true
          : cell.isFlagged && cell.value !== -1
          ? false
          : undefined;
      return {
        ...cell,
        isRevealed: true,
        isFlagCorrect,
      };
    })
  );
}

export function checkBadBoard(openCells: [number, number][]): boolean {
  const minRow = Math.min(...openCells.map(([r]) => r));
  const maxRow = Math.max(...openCells.map(([r]) => r));
  const minCol = Math.min(...openCells.map(([, c]) => c));
  const maxCol = Math.max(...openCells.map(([, c]) => c));
  const openCellsSet = new Set(openCells.map(([r, c]) => `${r},${c}`));

  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      if (!openCellsSet.has(`${r},${c}`)) {
        return false;
      }
    }
  }
  return true;
}

export function copyBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

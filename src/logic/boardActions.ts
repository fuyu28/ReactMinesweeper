import { Board } from "../types/board";
import { GameStatus } from "../types/gameStatus";
import { directions } from "../constants/directions";
import {
  getSafeArea,
  initializeBoard,
  copyBoard,
  floodFill,
  revealAllCells,
  checkBadBoard,
} from "./board";
import { checkGameSettings } from "./checkGameSettings";
import { checkWin } from "./rules";

type revealResult =
  | { status: GameStatus.Playing; board: Board }
  | { status: GameStatus.Won; board: Board }
  | { status: GameStatus.Lost; board: Board }
  | { status: GameStatus.Error; board: Board };

function generateGoodBoard(
  r: number,
  c: number,
  rows: number,
  cols: number,
  mines: number,
  excludeCells: number
): Board {
  while (true) {
    const safeArea = getSafeArea(r, c, rows, cols, excludeCells);
    const initialBoard = initializeBoard(rows, cols, mines, safeArea);
    initialBoard[r][c].isRevealed = true;
    const result = floodFill(initialBoard, r, c);
    if (!checkBadBoard(result.openCells)) {
      return result.board;
    }
  }
}

export function createBoardAfterFirstClick(
  r: number,
  c: number,
  rows: number,
  cols: number,
  mines: number,
  excludeCells: number
): revealResult {
  const isValidSettings = checkGameSettings({
    rows,
    cols,
    mines,
    excludeCells,
  });
  if (!isValidSettings.valid) {
    alert(isValidSettings.message);
    return { status: GameStatus.Error, board: [] };
  }
  const flooded = generateGoodBoard(r, c, rows, cols, mines, excludeCells);
  if (flooded[r][c].value === -1) {
    flooded[r][c].isExploded = true;
    return { status: GameStatus.Lost, board: revealAllCells(flooded) };
  }
  if (checkWin(flooded, mines)) {
    return { status: GameStatus.Won, board: revealAllCells(flooded) };
  }
  return { status: GameStatus.Playing, board: flooded };
}

export function revealCellAndUpdateBoard(
  board: Board,
  r: number,
  c: number
): revealResult {
  const nextBoard = copyBoard(board);
  nextBoard[r][c].isRevealed = true;
  if (nextBoard[r][c].value === -1) {
    nextBoard[r][c].isExploded = true;
    return { status: GameStatus.Lost, board: revealAllCells(nextBoard) };
  }
  if (
    checkWin(nextBoard, board.flat().filter((cell) => cell.value === -1).length)
  ) {
    return { status: GameStatus.Won, board: revealAllCells(nextBoard) };
  }
  const result = floodFill(nextBoard, r, c);
  return { status: GameStatus.Playing, board: result.board };
}

export function revealAdjacentCells(
  board: Board,
  r: number,
  c: number,
  mineCount: number
): revealResult {
  if (!board[r][c].isRevealed || board[r][c].value === -1) {
    return { status: GameStatus.Playing, board };
  }

  const rows = board.length;
  const cols = board[0].length;
  const flagCount = directions
    .map(([dr, dc]) => [r + dr, c + dc])
    .filter(
      ([nr, nc]) =>
        nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isFlagged
    ).length;
  if (flagCount !== board[r][c].value) {
    return { status: GameStatus.Playing, board };
  }

  let nextBoard = copyBoard(board);

  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
    if (nextBoard[nr][nc].isRevealed) continue;
    if (nextBoard[nr][nc].isFlagged) continue;

    nextBoard[nr][nc].isRevealed = true;

    if (nextBoard[nr][nc].value === -1) {
      nextBoard[nr][nc].isExploded = true;
      return { status: GameStatus.Lost, board: revealAllCells(nextBoard) };
    } else {
      const result = floodFill(nextBoard, nr, nc);
      nextBoard = result.board;
    }
  }
  if (checkWin(nextBoard, mineCount)) {
    return { status: GameStatus.Won, board: revealAllCells(nextBoard) };
  }
  return { status: GameStatus.Playing, board: nextBoard };
}

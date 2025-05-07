import { useState, useEffect } from "react";

import type { GameSettings as GameSettingsType } from "./types/gameSettings.ts";
import type { Board } from "./types/board.ts";
import { GameStatus } from "./types/gameStatus.ts";

import GameSettingsComponent from "./components/GameSettings";
import GameBoard from "./components/GameBoard";
import GameInfo from "./components/GameInfo";

import { useGameTimer } from "./hooks/useGameTimer.ts";

import {
  initializeBoard,
  floodFill,
  getSafeArea,
  revealAllCells,
  copyBoard,
} from "./logic/board.ts";
import { getRemainingFlags } from "./logic/info.ts";
import { checkGameSettings } from "./logic/checkGameSettings.ts";
import { checkWin } from "./logic/rules.ts";

const defaultSettings: GameSettingsType = {
  rows: 9,
  cols: 9,
  mines: 10,
  excludeCells: 9,
};

function App() {
  const [gameSettings, setGameSettings] =
    useState<GameSettingsType>(defaultSettings);
  const [board, setBoard] = useState<Board>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [mines, setMines] = useState<number | undefined>(undefined);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number | undefined>(undefined);

  function handleFirstClick(r: number, c: number): Board {
    const { rows, cols, mines, excludeCells } = gameSettings;
    const safeArea = getSafeArea(r, c, rows, cols, excludeCells);
    const initialBoard = initializeBoard(rows, cols, mines, safeArea);
    const nextBoard = initialBoard;
    setStartTime(Date.now());
    setMines(mines);
    setGameStatus(GameStatus.Playing);
    setIsFirstClick(false);
    return nextBoard;
  }

  function resetGame() {
    if (!checkGameSettings(gameSettings)) {
      alert("Invalid game settings. Please check your input.");
      return;
    }
    const { rows, cols, mines, excludeCells } = gameSettings;
    const safeArea = getSafeArea(-1, -1, rows, cols, excludeCells);
    const newBoard = initializeBoard(rows, cols, mines, safeArea);
    setBoard(newBoard);
    setGameStatus(GameStatus.Ready);
    resetElapsedTime();
    setIsFirstClick(true);
    setStartTime(undefined);
    setMines(undefined);
  }

  function handleClick(r: number, c: number) {
    let nextBoard: Board;
    if (isFirstClick) {
      nextBoard = handleFirstClick(r, c);
    } else {
      if (gameStatus !== GameStatus.Playing) return;
      if (board[r][c].isFlagged) {
        alert("Cell is flagged. Unflag it before revealing.");
        return;
      }
      if (board[r][c].value === -1) {
        nextBoard = copyBoard(board);
        nextBoard[r][c].isRevealed = true;
        nextBoard[r][c].isExploded = true;
        setGameStatus(GameStatus.Lost);
        alert("Game Over! You hit a mine.");
        setBoard(revealAllCells(nextBoard));
        return;
      }

      nextBoard = copyBoard(board);
      nextBoard[r][c].isRevealed = true;
    }

    const flooded = floodFill(nextBoard, r, c);
    setBoard(flooded);

    if (checkWin(flooded, gameSettings.mines)) {
      setGameStatus(GameStatus.Won);
      alert("Congratulations! You've won the game.");
      const newBoard = revealAllCells(flooded);
      setBoard(newBoard);
    }
  }

  function handleRightClick(r: number, c: number) {
    if (gameStatus !== GameStatus.Playing) return;
    if (board[r][c].isRevealed) return;
    const newBoard = copyBoard(board);
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  }

  useEffect(() => {
    resetGame();
  }, []);

  const { elapsedTime, resetElapsedTime } = useGameTimer(gameStatus, startTime);

  return (
    <div className="p-4 flex flex-col items-center">
      <GameSettingsComponent
        settings={gameSettings}
        onChange={setGameSettings}
        onReset={resetGame}
      />
      <GameInfo
        mines={mines ?? 0}
        getRemainingFlags={getRemainingFlags(mines ?? 0, board)}
        time={elapsedTime}
      />
      <GameBoard
        board={board}
        onClick={handleClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
}

export default App;

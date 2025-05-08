import { useState, useEffect } from "react";

import type { GameSettings as GameSettingsType } from "./types/gameSettings.ts";
import type { Board } from "./types/board.ts";
import { GameStatus } from "./types/gameStatus.ts";

import GameSettingsComponent from "./components/GameSettings";
import GameBoard from "./components/GameBoard";
import GameInfo from "./components/GameInfo";

import { useGameTimer } from "./hooks/useGameTimer.ts";

import { createEmptyBoard, revealAllCells, copyBoard } from "./logic/board.ts";
import {
  createBoardAfterFirstClick,
  revealCellAndUpdateBoard,
  revealAdjacentCells,
} from "./logic/boardActions.ts";
import { getRemainingFlags } from "./logic/info.ts";
import { checkGameSettings } from "./logic/checkGameSettings.ts";

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

  function handleFirstClick(r: number, c: number) {
    const { rows, cols, mines, excludeCells } = gameSettings;
    const result = createBoardAfterFirstClick(
      r,
      c,
      rows,
      cols,
      mines,
      excludeCells
    );
    if (result.status === GameStatus.Error) {
      return;
    }
    setBoard(result.board);
    setStartTime(Date.now());
    setMines(mines);
    setGameStatus(GameStatus.Playing);
    setIsFirstClick(false);
    handleGameEnd(result.status, result.board);
  }

  function resetGame() {
    if (!checkGameSettings(gameSettings)) {
      alert("Invalid game settings. Please check your input.");
      return;
    }
    const { rows, cols } = gameSettings;
    const nextBoard = createEmptyBoard(rows, cols);
    setBoard(nextBoard);
    setGameStatus(GameStatus.Ready);
    resetElapsedTime();
    setIsFirstClick(true);
    setStartTime(undefined);
    setMines(undefined);
  }

  function handleClick(r: number, c: number) {
    if (isFirstClick) {
      handleFirstClick(r, c);
    } else {
      if (gameStatus !== GameStatus.Playing) return;
      if (board[r][c].isFlagged) {
        alert("Cell is flagged. Unflag it before revealing.");
        return;
      }

      const result = revealCellAndUpdateBoard(board, r, c);
      setBoard(result.board);
      handleGameEnd(result.status, result.board);
    }
  }

  function handleDoubleClick(r: number, c: number) {
    const result = revealAdjacentCells(board, r, c, mines ?? 0);
    setBoard(result.board);
    handleGameEnd(result.status, result.board);
  }

  function handleRightClick(r: number, c: number) {
    if (gameStatus !== GameStatus.Playing) return;
    if (board[r][c].isRevealed) return;
    const nextBoard = copyBoard(board);
    nextBoard[r][c].isFlagged = !nextBoard[r][c].isFlagged;
    setBoard(nextBoard);
  }

  function handleGameEnd(status: GameStatus, board: Board) {
    if (status === GameStatus.Lost) {
      setGameStatus(GameStatus.Lost);
      setBoard(revealAllCells(board));
      alert("Game Over! You hit a mine.");
    } else if (status === GameStatus.Won) {
      setGameStatus(GameStatus.Won);
      setBoard(revealAllCells(board));
      alert("Congratulations! You've won the game.");
    }
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
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";

import type { GameSettings as GameSettingsType } from "./types/gameSettings.ts";
import { GameStatus } from "./types/gameStatus.ts";
import type { Cell } from "./types/cell.ts";

import GameSettingsComponent from "./components/GameSettings";
import GameBoard from "./components/GameBoard";

import { initializeBoard, floodFill, getSafeArea } from "./logic/board.ts";
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
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);

  function handleClick(r: number, c: number) {
    if (isFirstClick) {
      const { rows, cols, mines } = gameSettings;
      const safeArea = getSafeArea(r, c, rows, cols, 10);
      const newBoard = initializeBoard(rows, cols, mines, safeArea);
      const floodedBoard = floodFill(newBoard, r, c);
      setBoard(floodedBoard);
      setGameStatus(GameStatus.Playing);
      setIsFirstClick(false);
      return;
    }

    if (gameStatus !== GameStatus.Playing) return;
    if (board[r][c].value === -1) {
      setGameStatus(GameStatus.Lost);
      alert("Game Over! You hit a mine.");
      return;
    }

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].isOpen = true;
    const floodedBoard = floodFill(newBoard, r, c);
    setBoard(floodedBoard);

    if (checkWin(floodedBoard, gameSettings.mines)) {
      setGameStatus(GameStatus.Won);
      alert("Congratulations! You've won the game.");
    }
  }

  function handleRightClick(r: number, c: number) {
    if (gameStatus !== GameStatus.Playing) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  }

  function resetGame() {
    if (!checkGameSettings(gameSettings)) {
      alert("Invalid game settings. Please check your input.");
      return;
    }
    const { rows, cols, mines } = gameSettings;
    const safeArea = getSafeArea(-1, -1, rows, cols, 10);
    const newBoard = initializeBoard(rows, cols, mines, safeArea);
    setBoard(newBoard);
    setGameStatus(GameStatus.Ready);
    setIsFirstClick(true);
  }

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <GameSettingsComponent
        settings={gameSettings}
        onChange={setGameSettings}
        onReset={resetGame}
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

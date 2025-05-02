import { useState } from "react";
import type { GameSettings as GameSettingsType } from "./types/gameSettings.ts";
import type { Cell } from "./types/cell.ts";
import GameSettingsComponent from "./components/GameSettings";
import GameBoard from "./components/GameBoard";
import { initializeBoard } from "./logic/board.ts";

const defaultSettings: GameSettingsType = {
  rows: 9,
  cols: 9,
  mines: 10,
};

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

function App() {
  const [gameSettings, setGameSettings] =
    useState<GameSettingsType>(defaultSettings);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<
    "ready" | "playing" | "lost" | "won"
  >("ready");

  const startGame = () => {
    const { rows, cols, mines } = gameSettings;
    if (rows < 1 || cols < 1 || mines < 1) {
      alert("Invalid game settings!");
      return;
    }
    if (mines > rows * cols) {
      alert("Too many mines for the board size!");
      return;
    }
    const newBoard = initializeBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameStatus("playing");
  };

  function handleClick(r: number, c: number) {
    if (gameStatus !== "playing") return;
    if (board[r][c].value === -1) {
      setGameStatus("lost");
      alert("Game Over! You hit a mine.");
      return;
    }
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].isOpen = true;
    const floodedBoard = floodFill(newBoard, r, c);
    setBoard(floodedBoard);
    if (checkWin(floodedBoard, gameSettings.mines)) {
      setGameStatus("won");
      alert("Congratulations! You've won the game.");
    }
  }

  function handleRightClick(r: number, c: number) {
    if (gameStatus !== "playing") return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  }

  function checkWin(board: Cell[][], mineCount: number): boolean {
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

  function floodFill(board: Cell[][], x: number, y: number): Cell[][] {
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

  return (
    <div className="p-4 flex flex-col items-center">
      <GameSettingsComponent
        settings={gameSettings}
        onChange={setGameSettings}
        onStart={startGame}
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

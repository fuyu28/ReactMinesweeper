import { useState, useEffect } from "react";

import type { GameSettings as GameSettingsType } from "./types/gameSettings.ts";
import type { Board } from "./types/board.ts";
import type { ClickModeType } from "./types/clickMode.ts";
import { GameStatus } from "./types/gameStatus.ts";

import GameSettingsComponent from "./components/GameSettings";
import GameBoard from "./components/GameBoard";
import GameInfo from "./components/GameInfo";
import ClickMode from "./components/ClickMode";
import Help from "./components/Help";

import { useGameTimer } from "./hooks/useGameTimer.ts";

import { createEmptyBoard, revealAllCells, copyBoard } from "./logic/board.ts";
import {
  createBoardAfterFirstClick,
  revealCellAndUpdateBoard,
  revealAdjacentCells,
} from "./logic/boardActions.ts";
import { getRemainingFlags } from "./logic/info.ts";
import { checkGameSettings } from "./logic/checkGameSettings.ts";

import { useLang } from "./context/useLang.ts";
import { t } from "./utils/t.ts";

const defaultSettings: GameSettingsType = {
  rows: 9,
  cols: 9,
  mines: 10,
  excludeCells: 9,
};

function App() {
  const [editingSettings, setEditingSettings] =
    useState<GameSettingsType>(defaultSettings);
  const [activeGameSettings, setActiveGameSettings] =
    useState<GameSettingsType>(defaultSettings);
  const [board, setBoard] = useState<Board>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [mines, setMines] = useState<number | undefined>(undefined);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [clickMode, setClickMode] = useState<ClickModeType>("single");
  const { lang, setLang } = useLang();

  function handleFirstClick(r: number, c: number) {
    const { mines } = activeGameSettings;
    const result = createBoardAfterFirstClick(r, c, activeGameSettings, lang);
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
    const isValidGameSettings = checkGameSettings(editingSettings, lang);
    if (!isValidGameSettings.valid) {
      alert(isValidGameSettings.message);
      return;
    }
    const { rows, cols } = editingSettings;
    const nextBoard = createEmptyBoard(rows, cols);
    setBoard(nextBoard);
    setGameStatus(GameStatus.Ready);
    setActiveGameSettings(editingSettings);
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

  function handleClickModeChange(mode: ClickModeType) {
    console.log("Click mode changed to:", mode);
    setClickMode(mode);
  }

  function handleTap(r: number, c: number) {
    switch (clickMode) {
      case "single":
        handleClick(r, c);
        break;
      case "double":
        handleDoubleClick(r, c);
        break;
      case "right":
        handleRightClick(r, c);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { elapsedTime, resetElapsedTime } = useGameTimer(gameStatus, startTime);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="lang">{t(lang, "ui.selectLang")}</label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value as typeof lang)}
          className="border rounded px-2 py-1"
        >
          <option value="ja">日本語</option>
          <option value="en">English</option>
        </select>
      </div>
      <GameSettingsComponent
        settings={editingSettings}
        onChange={setEditingSettings}
        onReset={resetGame}
      />
      <GameInfo
        mines={mines ?? 0}
        getRemainingFlags={getRemainingFlags(mines ?? 0, board)}
        time={elapsedTime}
      />
      <div className="block md:hidden">
        <ClickMode clickMode={clickMode} onClick={handleClickModeChange} />
      </div>
      <Help lang={lang} />
      <div className="overflow-auto max-h-[80vh] max-w-[90vh]">
        <GameBoard
          board={board}
          onClick={handleClick}
          onRightClick={handleRightClick}
          onDoubleClick={handleDoubleClick}
          onTap={handleTap}
        />
      </div>
    </div>
  );
}

export default App;

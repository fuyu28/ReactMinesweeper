import type { Cell } from "../types/cell.ts";

type Props = {
  cell: Cell;
  onClick: () => void;
  onRightClick: () => void;
};

const Cell = ({ cell, onClick, onRightClick }: Props) => {
  const style = cell.isExploded
    ? "bg-red-400"
    : cell.isFlagged && cell.isFlagCorrect === true
    ? "bg-green-300"
    : cell.isFlagged && cell.isFlagCorrect === false
    ? "bg-red-300"
    : cell.isRevealed
    ? "bg-gray-200"
    : "bg-gray-400";

  return (
    <button
      className={`w-8 h-8 text-sm border border-gray-300 font-bold ${style}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {cell.isExploded
        ? "💥" // 爆発した箇所
        : cell.isFlagged && cell.isFlagCorrect === false
        ? "🚩" // 間違った旗
        : cell.isFlagged && cell.isFlagCorrect === true
        ? "🚩" // 正しい旗
        : cell.isFlagged
        ? "🚩" // プレイ中の旗
        : cell.isRevealed && cell.value === -1
        ? "💣" // 地雷
        : cell.isRevealed && cell.value > 0
        ? cell.value // 数字
        : ""}
    </button>
  );
};

export default Cell;

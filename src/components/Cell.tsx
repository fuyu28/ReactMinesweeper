import type { Cell } from "../types/cell.ts";

type Props = {
  cell: Cell;
  onClick: () => void;
  onDoubleClick: () => void;
  onRightClick: () => void;
};

function getCellDisplay(cell: Cell) {
  if (cell.isExploded) return "💥"; // 爆発した箇所
  if (cell.isFlagged) return "🚩"; // プレイ中の旗
  if (cell.isRevealed && cell.value === -1) return "💣"; // 地雷
  if (cell.isRevealed && cell.value > 0) return cell.value; // 数字
  return ""; // 未開封のセル
}

function getCellStyle(cell: Cell) {
  if (cell.isExploded) return "bg-red-400"; // 爆発した箇所
  if (cell.isFlagged && cell.isFlagCorrect === true) return "bg-green-300"; // 正しい旗
  if (cell.isFlagged && cell.isFlagCorrect === false) return "bg-red-300"; // 間違った旗
  if (cell.isRevealed) return "bg-gray-200"; // 開封されたセル
  return "bg-gray-400"; // 未開封のセル
}

const Cell = ({ cell, onClick, onRightClick, onDoubleClick }: Props) => {
  return (
    <button
      className={`w-8 h-8 text-sm border border-gray-300 font-bold ${getCellStyle(
        cell
      )}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {getCellDisplay(cell)}
    </button>
  );
};

export default Cell;

import type { Cell } from "../types/cell.ts";

type Props = {
  cell: Cell;
  onClick: () => void;
  onRightClick: () => void;
};

const Cell = ({ cell, onClick, onRightClick }: Props) => {
  const style = cell.isRevealed ? "bg-gray-200" : "bg-gray-400";

  return (
    <button
      className={`w-8 h-8 text-sm border border-gray-300 font-bold ${style}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {cell.isRevealed
        ? cell.value === -1
          ? "💣"
          : cell.value > 0
          ? cell.value
          : ""
        : cell.isFlagged
        ? "🚩"
        : ""}
    </button>
  );
};

export default Cell;

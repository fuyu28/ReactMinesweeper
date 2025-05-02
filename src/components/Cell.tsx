import type { Cell } from "../types/cell.ts";

type Props = {
  cell: Cell;
  onClick: () => void;
  onRightClick: () => void;
};

const Cell = ({ cell, onClick, onRightClick }: Props) => {
  const style = cell.isOpen
    ? "bg-gray-200"
    : cell.isFlagged
    ? "bg-yellow-400"
    : "bg-gray-400";

  return (
    <button
      className={`w-8 h-8 text-sm font-bold border ${style}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {cell.isOpen && cell.value === -1
        ? "💣"
        : !cell.isOpen
        ? ""
        : cell.value === 0
        ? ""
        : cell.value}
    </button>
  );
};

export default Cell;

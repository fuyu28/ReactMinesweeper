import type { Board } from "../types/board";
import Cell from "./Cell";

type Props = {
  board: Board;
  onClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
  onDoubleClick: (x: number, y: number) => void;
  onTap: (x: number, y: number) => void;
};

const GameBoard = ({
  board,
  onClick,
  onRightClick,
  onDoubleClick,
  onTap,
}: Props) => {
  if (board.length === 0) return null;
  const rows = board.length;
  const cols = board[0].length;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 2rem)`,
        gridTemplateRows: `repeat(${rows}, 2rem)`,
      }}
    >
      {board.flatMap((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`}
            cell={cell}
            onClick={() => onClick(y, x)}
            onRightClick={() => onRightClick(y, x)}
            onDoubleClick={() => onDoubleClick(y, x)}
            onTap={() => onTap(y, x)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;

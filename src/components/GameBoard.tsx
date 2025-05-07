import Cell from "./Cell";

type Props = {
  board: Cell[][];
  onClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
};

const GameBoard = ({ board, onClick, onRightClick }: Props) => {
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
            key={`${x}-${y}`}
            cell={cell}
            onClick={() => onClick(y, x)}
            onRightClick={() => onRightClick(y, x)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;

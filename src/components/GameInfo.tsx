import {} from "../logic/info.ts";

type Props = {
  mines: number;
  remainFlags: number;
  time: number;
};

const GameInfo = ({ mines, remainFlags, time }: Props) => {
  const remainFlagsText = remainFlags >= 0 ? "black" : "red";
  return (
    <div className="mb-4 text-sm font-mono flex gap-4">
      <div>💣 {mines}</div>
      <div style={{ color: remainFlagsText }}>🚩 {remainFlags}</div>
      <div>⏱ {time}</div>
    </div>
  );
};

export default GameInfo;

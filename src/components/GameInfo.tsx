import {} from "../logic/info.ts";

type Props = {
  mines: number;
  remainFlags: number;
  time: number;
};

const GameInfo = ({ mines, remainFlags, time }: Props) => {
  return (
    <div className="mb-4 text-sm font-mono flex gap-4">
      <div>💣 {mines}</div>
      <div>🚩 {remainFlags}</div>
      <div>⏱ {time}</div>
    </div>
  );
};

export default GameInfo;

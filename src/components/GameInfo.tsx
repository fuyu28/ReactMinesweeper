type Props = {
  mines: number;
  getRemainingFlags: number;
  time: number;
};

const getFlagsTextColor = (getRemainingFlags: number): string => {
  return getRemainingFlags >= 0 ? "text-black" : "text-red-500";
};

const GameInfo = ({ mines, getRemainingFlags, time }: Props) => {
  return (
    <div className="mb-4 text-sm font-mono flex gap-4">
      <div>💣 {mines}</div>
      <div className={getFlagsTextColor(getRemainingFlags)}>
        🚩 {getRemainingFlags}
      </div>
      <div>⏱ {time}</div>
    </div>
  );
};

export default GameInfo;

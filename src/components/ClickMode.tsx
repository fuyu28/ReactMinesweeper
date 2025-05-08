import { ClickModeType } from "../types/clickMode";

type Props = {
  clickMode: ClickModeType;
  onClick: (mode: ClickModeType) => void;
};

const ClickMode = ({ clickMode, onClick }: Props) => {
  const clickModes = ["single", "double", "right"] as const;
  return (
    <div className="flex gap-4 mb-4">
      {clickModes.map((mode) => (
        <button
          className={`px-4 py-2 rounded transition-colors ${
            mode === clickMode
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          key={mode}
          onClick={() => onClick(mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ClickMode;

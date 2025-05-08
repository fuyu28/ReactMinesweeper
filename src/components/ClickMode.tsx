import { ClickModeType } from "../types/clickMode";

type Props = {
  clickMode: ClickModeType;
  onClick: (mode: ClickModeType) => void;
};

const ClickMode = ({ clickMode, onClick }: Props) => {
  const clickModes = [
    { value: "single", label: "🔘" },
    { value: "double", label: "🔄" },
    { value: "right", label: "🚩" },
  ] as const;
  return (
    <div className="flex gap-4 mb-4">
      {clickModes.map((mode) => (
        <button
          className={`px-4 py-2 rounded transition-colors ${
            mode.value === clickMode
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          key={mode.value}
          onClick={() => onClick(mode.value)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default ClickMode;

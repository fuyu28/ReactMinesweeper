import type { GameSettings as GameSettingsType } from "../types/gameSettings.ts";

type Props = {
  settings: GameSettingsType;
  onChange: (newSettings: GameSettingsType) => void;
  onReset: () => void;
};

const GameSettings = ({ settings, onChange, onReset }: Props) => {
  const handleChange = (key: keyof GameSettingsType, value: string) => {
    const parsedValue = value === "" ? undefined : Number(value);
    onChange({ ...settings, [key]: parsedValue });
  };
  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <label>
          Rows:
          <input
            type="number"
            min={1}
            value={settings.rows}
            onChange={(e) => handleChange("rows", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          Columns:
          <input
            type="number"
            min={1}
            value={settings.cols}
            onChange={(e) => handleChange("cols", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          Mines:
          <input
            type="number"
            min={1}
            value={settings.mines}
            onChange={(e) => handleChange("mines", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          Exclude Cells:
          <input
            type="number"
            min={0}
            value={settings.excludeCells}
            onChange={(e) => handleChange("excludeCells", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <button
          onClick={onReset}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Reset Game
        </button>
      </div>
    </>
  );
};

export default GameSettings;

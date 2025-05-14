import { useEffect, useState } from "react";
import type { GameSettings as GameSettingsType } from "../types/gameSettings.ts";
import { useLang } from "../context/useLang.ts";
import { t } from "../utils/t.ts";

type Props = {
  settings: GameSettingsType;
  onChange: (newSettings: GameSettingsType) => void;
  onReset: () => void;
};

const GameSettings = ({ settings, onChange, onReset }: Props) => {
  const [disable, setDisable] = useState<boolean>(false);
  const { lang } = useLang();

  useEffect(() => {
    const hasUndefined = Object.values(settings).some((v) => v === undefined);
    setDisable(hasUndefined);
  }, [settings]);

  const handleChange = (key: keyof GameSettingsType, value: string) => {
    const parsedValue = value === "" ? undefined : Number(value);
    onChange({ ...settings, [key]: parsedValue });
  };

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <label>
          {t(lang, "ui.rows")}
          <input
            type="number"
            min={1}
            value={settings.rows ?? ""}
            onChange={(e) => handleChange("rows", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          {t(lang, "ui.cols")}
          <input
            type="number"
            min={1}
            value={settings.cols ?? ""}
            onChange={(e) => handleChange("cols", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          {t(lang, "ui.mines")}
          <input
            type="number"
            min={1}
            value={settings.mines ?? ""}
            onChange={(e) => handleChange("mines", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
        <label>
          {t(lang, "ui.excludeCells")}
          <input
            type="number"
            min={0}
            value={settings.excludeCells ?? ""}
            onChange={(e) => handleChange("excludeCells", e.target.value)}
            className="border w-16 ml-1 px-1"
          ></input>
        </label>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <button
          onClick={onReset}
          disabled={disable}
          className="bg-blue-500 disabled:bg-gray-400 text-white px-2 py-1 rounded"
        >
          {t(lang, "ui.reset")}
        </button>
      </div>
    </>
  );
};

export default GameSettings;

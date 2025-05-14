import { useState } from "react";
import { Lang } from "../locales";
import { t } from "../utils/t.ts";

type Props = {
  lang: Lang;
};

const Help = ({ lang }: Props) => {
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <div className="flex justify-center mb-2">
      <button
        className="text-xl border border-black px-2 py-1 rounded hover:bg-gray-200"
        onClick={() => setShowHelp(!showHelp)}
      >
        ❓
      </button>
      {showHelp && (
        <div className="fixed top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-6 rounded-xl shadow-xl z-50">
          <h2 className="text-lg font-bold text-center mb-4">
            {t(lang, "hints.howToPlay")}
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>{t(lang, "hints.singleClickMode")}:</strong>{" "}
              {t(lang, "hints.singleClick")}
            </li>
            <li>
              <strong>{t(lang, "hints.doubleClickMode")}:</strong>{" "}
              {t(lang, "hints.doubleClick")}
            </li>
            <li>
              <strong>{t(lang, "hints.rightClickMode")}:</strong>{" "}
              {t(lang, "hints.rightClick")}
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setShowHelp(false)}
            >
              {t(lang, "hints.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;

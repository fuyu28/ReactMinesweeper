import { useState } from "react";

const Help = () => {
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
        <div className="fixed top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-4 rounded shadow-lg z-50">
          <p className="font-semibold text-center mb-2">How to Play</p>
          <p>👆 Tap: Reveal a cell (Single click)</p>
          <p>🔄 Tap: Reveal surrounding cells (Double click)</p>
          <p>🚩 Tap: Place a flag (Right click)</p>
          <div className="flex justify-center mt-4">
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setShowHelp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;

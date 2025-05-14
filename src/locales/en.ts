export default {
  ui: {
    selectLang: "Select Lang",
    rows: "Rows",
    cols: "Cols",
    mines: "Mines",
    excludeCells: "Exclude Cells",
    reset: "Reset Game",
  },
  errors: {
    invalidRowsCols: "Rows and columns must be greater than 0.",
    invalidMines:
      "Mines must be greater than 0 and less than or equal to the total number of cells.",
    invalidExclude:
      "Exclude cells must be greater than or equal to 0 and less than the total number of cells.",
    exceedTotal:
      "The number of excluded cells and mines must not exceed the total number of cells.",
  },
  hints: {
    howToPlay: "How to Play",
    close: "Close",
    singleClick: "Open a cell",
    doubleClick:
      "If the number of flags matches the number on the cell, open all unflagged adjacent cells",
    rightClick: "Place or remove a flag",
    singleClickMode: "Left click (👆 mode)",
    doubleClickMode: "Left click on an opened cell (🔄 mode)",
    rightClickMode: "Right click (🚩 mode)",
  },
};

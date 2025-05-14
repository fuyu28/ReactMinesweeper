export default {
  ui: {
    selectLang: "言語を選択",
    rows: "行数",
    cols: "列数",
    mines: "地雷の数",
    excludeCells: "除外マスの数",
    reset: "ゲームをリセット",
  },
  errors: {
    invalidRowsCols: "行と列の数は1以上である必要があります。",
    invalidMines: "地雷の数は1以上全体のマス数未満である必要があります。",
    invalidExclude:
      "除外するマスの数は1以上全体のマス数未満である必要があります。",
    exceedTotal:
      "地雷の数と除外するマス数の合計が全体のマス数を超えてはいけません。",
  },
  hints: {
    howToPlay: "遊び方",
    close: "閉じる",
    singleClick: "マスを開ける",
    doubleClick:
      "数字マスのまわりに置かれた🚩の数がその数字と同じとき、まだ開かれていない隣接したマスをすべて自動で開ける。",
    rightClick: "🚩を立てる",
    singleClickMode: "左クリック(👆モード)",
    doubleClickMode: "空いたマスを左クリック(🔄モード)",
    rightClickMode: "右クリック(🚩モード)",
  },
};

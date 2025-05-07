export type Cell = {
  value: number;
  isRevealed: boolean;
  isFlagged: boolean;
  isExploded?: boolean;
  isFlagCorrect?: boolean;
};

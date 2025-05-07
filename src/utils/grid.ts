export function isValidCell(
  r: number,
  c: number,
  rows: number,
  cols: number
): boolean {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

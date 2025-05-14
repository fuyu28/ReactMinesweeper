let lastTap = 0;

export function isDoubleTap(): boolean {
  const now = Date.now();
  const isDouble = now - lastTap < 300;
  lastTap = now;
  return isDouble;
}

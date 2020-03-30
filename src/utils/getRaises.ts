export function getRaises(sum: number, target: number): number {
  return Math.max(0, Math.floor((sum - target) / 4));
}

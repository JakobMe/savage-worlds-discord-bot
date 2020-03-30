export function signNumber(num: number): string {
  const sign = num > 0 ? '+' : num === 0 ? '±' : '';
  return `${sign}${num}`;
}

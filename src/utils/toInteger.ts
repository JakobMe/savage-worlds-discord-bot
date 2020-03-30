export function toInteger(str: string, fallback = 0): number {
  const int = parseInt(str);
  return isNaN(int) ? fallback : int;
}

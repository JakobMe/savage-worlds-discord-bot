export function getMin(arr: number[]): [number, number[]] {
  const min = Math.min(...arr);
  const i = arr.findIndex(num => num === min);
  const rest = arr.filter((_, j) => j !== i);
  return [min, rest];
}

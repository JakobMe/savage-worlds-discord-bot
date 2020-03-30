export function getMax(arr: number[]): [number, number[]] {
  const max = Math.max(...arr);
  const i = arr.findIndex(num => num === max);
  const rest = arr.filter((_, j) => j !== i);
  return [max, rest];
}

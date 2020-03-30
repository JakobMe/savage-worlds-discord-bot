export function sumNumbers(arr: number[], add = 0): number {
  return arr.reduce((sum, num) => sum + num, add);
}

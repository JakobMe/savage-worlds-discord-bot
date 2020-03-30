export function sumNumbers(arr: number[], add: number): number {
  return arr.reduce((sum, num) => sum + num, add);
}

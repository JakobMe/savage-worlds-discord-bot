import { randomInteger } from './randomInteger';

export function roll(n: number, m: number, offset = 0): number[] {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(randomInteger(1, m) + offset);
  }
  return results;
}

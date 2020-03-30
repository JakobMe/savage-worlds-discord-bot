import { randomInteger } from './randomInteger';

export function randomItem<T>(arr: T[]): T {
  const i = randomInteger(0, arr.length - 1);
  return arr[i];
}

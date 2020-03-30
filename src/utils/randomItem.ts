import { randomInteger } from './randomInteger';

export function randomItem<T>(arr: T[]): [T, T[]] {
  const i = randomInteger(0, arr.length - 1);
  const item = arr[i];
  const rest = arr.filter((_, j) => j !== i);
  return [item, rest];
}

export function randomItems<T>(arr: T[], amount: number): T[] {
  const items: T[] = [];
  let i = amount;
  let available = arr;

  while (i > 0) {
    const [item, rest] = randomItem(available);
    available = rest;
    i--;
    items.push(item);
  }

  return items;
}

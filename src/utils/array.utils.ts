import NumberUtils from './number.utils';

function randomItem<T>(arr: T[]): [T, T[]] {
  const i = NumberUtils.random(0, arr.length - 1);
  const item = arr[i];
  const rest = arr.filter((_, j) => j !== i);
  return [item, rest];
}

function randomItems<T>(arr: T[], amount: number): T[] {
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

function sortBy<T>(arr: T[], prop: keyof T, reverse = false): T[] {
  const sorted = [...arr].sort((a, b) =>
    a[prop].toString().localeCompare(b[prop].toString(), 'de', { numeric: true })
  );
  return reverse ? [...sorted].reverse() : sorted;
}

const ArrayUtils = {
  randomItem,
  randomItems,
  sortBy
};

export default ArrayUtils;

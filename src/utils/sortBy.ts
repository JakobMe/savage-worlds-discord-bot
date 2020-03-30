export function sortBy<T>(arr: T[], prop: keyof T, reverse = false): T[] {
  const sorted = [...arr].sort((a, b) =>
    a[prop].toString().localeCompare(b[prop].toString(), 'de', { numeric: true })
  );
  return reverse ? [...sorted].reverse() : sorted;
}

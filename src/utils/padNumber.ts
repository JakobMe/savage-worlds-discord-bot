export function padNumber(num: number, max: number, prefix = ''): string {
  const diff = Math.max(0, max.toString().length - num.toString().length);
  const start = prefix ? `${prefix} ` : '';
  return `${start}${'0'.repeat(diff)}${num}`;
}

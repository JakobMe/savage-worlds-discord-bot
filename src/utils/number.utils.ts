function padNumber(num: number, max: number): string {
  return num.toString().padStart(max.toString().length, '0');
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function restrictNumber(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}

function signNumber(num: number): string {
  const sign = num > 0 ? '+' : num === 0 ? '±' : '';
  return `${sign}${num}`;
}

function sumNumbers(numbers: number[], add = 0): number {
  return numbers.reduce((sum, num) => sum + num, add);
}

function parseNumber(str: string | number, fallback = 0): number {
  const val = typeof str === 'number' ? str.toString() : str;
  const int = parseInt(val);
  return isNaN(int) ? fallback : int;
}

function rollNumbers(n: number, m: number): number[] {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(randomNumber(1, m));
  }
  return results;
}

function explodeRoll(m: number): number[] {
  const rolls = rollNumbers(1, m);
  while ([...rolls].pop() === m) {
    rolls.push(rollNumbers(1, m)[0]);
  }
  return rolls;
}

function countNumbers(num: number, arr: number[]): number {
  return arr.reduce((sum, n) => sum + (n === num ? 1 : 0), 0);
}

function roundNumber(num: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

function getMin(numbers: number[]): [number, number[]] {
  const min = Math.min(...numbers);
  const i = numbers.findIndex(num => num === min);
  const rest = numbers.filter((_, j) => j !== i);
  return [min, rest];
}

function getMax(numbers: number[]): [number, number[]] {
  const max = Math.max(...numbers);
  const i = numbers.findIndex(num => num === max);
  const rest = numbers.filter((_, j) => j !== i);
  return [max, rest];
}

const NumberUtils = {
  pad: padNumber,
  random: randomNumber,
  restrict: restrictNumber,
  sign: signNumber,
  sum: sumNumbers,
  parse: parseNumber,
  roll: rollNumbers,
  explode: explodeRoll,
  count: countNumbers,
  round: roundNumber,
  min: getMin,
  max: getMax
};

export default NumberUtils;

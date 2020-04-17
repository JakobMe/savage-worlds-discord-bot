import { resetMockRandom, mockRandom } from '../mocks/random.mock';
import NumberUtils from '../../src/utils/number.utils';

describe('NumberUtils', () => {
  const sequence = [...Array(600000).keys()];

  test('padNumber should create correct string', () => {
    expect(NumberUtils.pad(1, 10)).toBe('01');
    expect(NumberUtils.pad(10, 1)).toBe('10');
    expect(NumberUtils.pad(10, 10)).toBe('10');
    expect(NumberUtils.pad(10, 1000)).toBe('0010');
    expect(NumberUtils.pad(1000, 10)).toBe('1000');
  });

  test('randomNumber should generate numbers between min and max', () => {
    const r0 = sequence.map(() => NumberUtils.random(1, 20));
    expect(r0.every(n => n <= 20 && n >= 1)).toBe(true);
  });

  test('randomNumber should have a confidence of 99% on large scales', () => {
    const r0 = sequence.map(() => NumberUtils.random(1, 6));
    const r1 = r0.filter(n => n === 1);
    const r2 = r0.filter(n => n === 2);
    const r3 = r0.filter(n => n === 3);
    const r4 = r0.filter(n => n === 4);
    const r5 = r0.filter(n => n === 5);
    const r6 = r0.filter(n => n === 6);

    const lengths = [r1, r2, r3, r4, r5, r6].map(r => r.length);
    const expected = sequence.length / 6;
    const error = expected * 0.01;

    lengths.forEach(length => {
      expect(length).toBeGreaterThanOrEqual(expected - error);
      expect(length).toBeLessThanOrEqual(expected + error);
    });
  });

  test('restrictNumber should create correct number', () => {
    expect(NumberUtils.restrict(5, 1, 10)).toBe(5);
    expect(NumberUtils.restrict(5, 5, 5)).toBe(5);
    expect(NumberUtils.restrict(5, 1, 3)).toBe(3);
    expect(NumberUtils.restrict(5, 7, 10)).toBe(7);
  });

  test('signNumber should create correct string', () => {
    expect(NumberUtils.sign(0)).toBe('±0');
    expect(NumberUtils.sign(5)).toBe('+5');
    expect(NumberUtils.sign(-5)).toBe('-5');
  });

  test('sumNumbers should create correct sum', () => {
    expect(NumberUtils.sum([10])).toBe(10);
    expect(NumberUtils.sum([1, 2, 3], 0)).toBe(6);
    expect(NumberUtils.sum([10, -5], 0)).toBe(5);
    expect(NumberUtils.sum([-5, -5, -5], 5)).toBe(-10);
    expect(NumberUtils.sum([10, 5, 15], -10)).toBe(20);
    expect(NumberUtils.sum([5, -5, 5], -5)).toBe(0);
  });

  test('parseNumber should create correct number', () => {
    expect(NumberUtils.parse('false')).toBe(0);
    expect(NumberUtils.parse('', 1)).toBe(1);
    expect(NumberUtils.parse(undefined, 2)).toBe(2);
    expect(NumberUtils.parse('abc', 3)).toBe(3);
    expect(NumberUtils.parse(null, 4)).toBe(4);
    expect(NumberUtils.parse(1, 5)).toBe(1);
    expect(NumberUtils.parse('0', 6)).toBe(0);
    expect(NumberUtils.parse('+1', 7)).toBe(1);
    expect(NumberUtils.parse('-10', 8)).toBe(-10);
  });

  test('rollNumbers should create correct numbers', () => {
    mockRandom(0.5);
    expect(NumberUtils.roll(1, 20)).toEqual([11]);
    expect(NumberUtils.roll(2, 6)).toEqual([4, 4]);
    expect(NumberUtils.roll(3, 4)).toEqual([3, 3, 3]);
    expect(NumberUtils.roll(5, 3)).toEqual([2, 2, 2, 2, 2]);
    resetMockRandom();
  });

  test('explodeRoll should create correct numbers', () => {
    mockRandom([0.5, 0.99, 0.99, 0.5]);
    expect(NumberUtils.explode(20)).toEqual([11]);
    expect(NumberUtils.explode(6)).toEqual([6, 6, 4]);
    resetMockRandom();
  });

  test('countNumbers should create correct count', () => {
    expect(NumberUtils.count(5, [5, 9, 15])).toBe(1);
    expect(NumberUtils.count(1, [1, 12, 1])).toBe(2);
    expect(NumberUtils.count(8, [8, 8, 8])).toBe(3);
    expect(NumberUtils.count(20, [12, 8, 19])).toBe(0);
  });

  test('roundNumber should create correct number', () => {
    expect(NumberUtils.round(10)).toBe(10);
    expect(NumberUtils.round(10.3, 0)).toBe(10);
    expect(NumberUtils.round(10.23)).toBe(10.23);
    expect(NumberUtils.round(10.23, 1)).toBe(10.2);
    expect(NumberUtils.round(10.2378)).toBe(10.24);
    expect(NumberUtils.round(10.2312)).toBe(10.23);
  });

  test('getMin should return correct numbers', () => {
    expect(NumberUtils.min([1])).toEqual([1, []]);
    expect(NumberUtils.min([2, 1, 3])).toEqual([1, [2, 3]]);
    expect(NumberUtils.min([1, 1, 1])).toEqual([1, [1, 1]]);
    expect(NumberUtils.min([-1, 1])).toEqual([-1, [1]]);
  });

  test('getMax should return correct numbers', () => {
    expect(NumberUtils.max([1])).toEqual([1, []]);
    expect(NumberUtils.max([2, 1, 3])).toEqual([3, [2, 1]]);
    expect(NumberUtils.max([1, 1, 1])).toEqual([1, [1, 1]]);
    expect(NumberUtils.max([-1, 1])).toEqual([1, [-1]]);
  });
});

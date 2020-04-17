import { resetMockRandom, mockRandom } from '../mocks/random.mock';
import ArrayUtils from '../../src/utils/array.utils';

describe('ArrayUtils', () => {
  test('randomItem should return correct item', () => {
    mockRandom(0.5);
    expect(ArrayUtils.randomItem([1, 2, 3])).toEqual([2, [1, 3]]);
    expect(ArrayUtils.randomItem(['a', 'b', 'c', 'd'])).toEqual(['c', ['a', 'b', 'd']]);
    expect(ArrayUtils.randomItem([])).toEqual([undefined, []]);
    resetMockRandom();
  });

  test('randomItems should return correct items', () => {
    mockRandom([0.99, 0, 0.5]);
    expect(ArrayUtils.randomItems([1, 2, 3, 4, 5], 3)).toEqual([5, 1, 3]);
    expect(ArrayUtils.randomItems([1, 2, 3], 3)).toEqual([3, 1, 2]);
    expect(ArrayUtils.randomItems([1, 2], 3)).toEqual([2, 1, undefined]);
    resetMockRandom();
  });

  test('sortBy should return correct array', () => {
    const arr = [
      { s: 'A', n: 3 },
      { s: 'B', n: 2 }
    ];

    expect(ArrayUtils.sortBy([...arr], 's')).toEqual(arr);
    expect(ArrayUtils.sortBy([...arr], 's', true)).toEqual([
      { s: 'B', n: 2 },
      { s: 'A', n: 3 }
    ]);

    expect(ArrayUtils.sortBy([...arr], 'n', true)).toEqual(arr);
    expect(ArrayUtils.sortBy([...arr], 'n')).toEqual([
      { s: 'B', n: 2 },
      { s: 'A', n: 3 }
    ]);
  });
});

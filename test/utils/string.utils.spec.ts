import StringUtils from '../../src/utils/string.utils';

describe('StringUtils', () => {
  test('enumerateItems should create correct string', () => {
    expect(StringUtils.enumerate(['a'])).toBe('a');
    expect(StringUtils.enumerate(['a', 'b'])).toBe('a und b');
    expect(StringUtils.enumerate(['a', 'b', 'c'])).toBe('a, b und c');
    expect(StringUtils.enumerate(['a', 'b', 'c', 'd'])).toBe('a, b, c und d');
  });
});

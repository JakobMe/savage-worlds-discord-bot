import { CheckItem } from '../../src/interfaces/check.interface';
import { DiceRollItem } from '../../src/interfaces/dice-roll.interface';
import CheckUtils from '../../src/utils/check.utils';

describe('CheckUtils', () => {
  test('isFumble should return correct boolean', () => {
    const arr1 = ([{ fumble: false }, { fumble: true }] as unknown) as CheckItem[];
    const arr2 = ([{ fumble: false }, { fumble: false }] as unknown) as CheckItem[];
    const arr3 = ([{ fumble: true }, { fumble: true }] as unknown) as CheckItem[];
    const arr4 = ([{ fumble: true }] as unknown) as CheckItem[];

    expect(CheckUtils.isFumble(arr1)).toBe(false);
    expect(CheckUtils.isFumble(arr2)).toBe(false);
    expect(CheckUtils.isFumble(arr3)).toBe(true);
    expect(CheckUtils.isFumble(arr4)).toBe(true);
  });

  test('getRaises should calculate correct number', () => {
    expect(CheckUtils.getRaises(1, 4)).toBe(0);
    expect(CheckUtils.getRaises(2, 4)).toBe(0);
    expect(CheckUtils.getRaises(4, 4)).toBe(0);
    expect(CheckUtils.getRaises(7, 4)).toBe(0);
    expect(CheckUtils.getRaises(8, 4)).toBe(1);
    expect(CheckUtils.getRaises(12, 4)).toBe(2);
    expect(CheckUtils.getRaises(15, 4)).toBe(2);
    expect(CheckUtils.getRaises(16, 4)).toBe(3);
  });

  test('getDiscarded should return correct index', () => {
    const arr1 = ([{ sum: 5 }, { sum: 2 }, { sum: 1 }] as unknown) as DiceRollItem[];
    const arr2 = ([{ sum: 0 }, { sum: 1 }, { sum: 2 }] as unknown) as DiceRollItem[];
    const arr3 = ([{ sum: 1 }, { sum: 0 }, { sum: 0 }] as unknown) as DiceRollItem[];
    const arr4 = ([{ sum: 5 }] as unknown) as DiceRollItem[];

    expect(CheckUtils.getDiscarded(arr1, true)).toBe(2);
    expect(CheckUtils.getDiscarded(arr1, false)).toBe(null);
    expect(CheckUtils.getDiscarded(arr2, true)).toBe(0);
    expect(CheckUtils.getDiscarded(arr3, true)).toBe(1);
    expect(CheckUtils.getDiscarded(arr4, true)).toBe(null);
  });

  test('getSuccesses should return correct values', () => {
    const arr1 = ([{ success: true, discard: false }] as unknown) as CheckItem[];
    const arr2 = ([{ success: false, discard: false }] as unknown) as CheckItem[];
    const arr3 = ([{ success: true, discard: true }] as unknown) as CheckItem[];

    expect(CheckUtils.getSuccesses(arr1)).toEqual({ successes: 1, emoji: ':white_check_mark:' });
    expect(CheckUtils.getSuccesses(arr2)).toEqual({ successes: 0, emoji: ':x:' });
    expect(CheckUtils.getSuccesses(arr3)).toEqual({ successes: 0, emoji: ':x:' });
  });

  test('getOutcome should return correct string', () => {
    expect(CheckUtils.getOutcome(false, false, false)).toEqual(expect.stringMatching('Fehlschlag'));
    expect(CheckUtils.getOutcome(true, false, false)).toEqual(expect.stringMatching('Erfolg'));
    expect(CheckUtils.getOutcome(true, false, true)).toEqual(expect.stringMatching('boom'));
    expect(CheckUtils.getOutcome(false, true, false)).toEqual(expect.stringMatching('Aussortiert'));
  });

  test('getEmoji should return correct string', () => {
    expect(CheckUtils.getEmoji(3, false)).toBe(':x:');
    expect(CheckUtils.getEmoji(3, true)).toBe(':three:');
    expect(CheckUtils.getEmoji(11, true)).toBe(':arrow_up:');
  });
});

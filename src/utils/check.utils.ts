import NumberUtils from './number.utils';
import { CheckItem } from '../interfaces/check.interface';
import { DiceRollItem } from '../interfaces/dice-roll.interface';

function isFumble(items: CheckItem[]): boolean {
  return items.filter(i => i.fumble).length > Math.floor(items.length / 2);
}

function getRaises(total: number, goal: number): number {
  return Math.max(0, Math.floor((total - goal) / 4));
}

function getDiscarded(items: DiceRollItem[]): number {
  const [min] = NumberUtils.min(items.map(i => i.sum));
  return items.length <= 1 ? null : items.findIndex(i => i.sum === min);
}

function getSuccesses(items: CheckItem[]): { successes: number; emoji: string } {
  const successes = items.filter(({ success, discard }) => success && !discard).length;
  const emoji = successes >= 1 ? ':white_check_mark:' : ':x:';
  return { successes, emoji };
}

function getOutcome(success: boolean, discard: boolean, explode: boolean): string {
  if (discard) {
    return '~~Aussortiert~~';
  } else if (success && explode) {
    return 'Erfolgreich :boom:';
  } else if (success) {
    return 'Erfolgreich';
  } else {
    return 'Fehlschlag';
  }
}

export function getEmoji(raises: number, success: boolean): string {
  return success
    ? {
        0: ':zero:',
        1: ':one:',
        2: ':two:',
        3: ':three:',
        4: ':four:',
        5: ':five:',
        6: ':six:',
        7: ':seven:',
        8: ':eight:',
        9: ':nine:',
        10: ':keycap_ten:'
      }[raises] ?? ':arrow_up:'
    : ':x:';
}

const CheckUtils = {
  isFumble,
  getRaises,
  getDiscarded,
  getSuccesses,
  getOutcome,
  getEmoji
};

export default CheckUtils;

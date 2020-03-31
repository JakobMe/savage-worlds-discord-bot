import { CardPlayer } from '../interfaces/card.interface';
import { code } from '../utils/code';
import { padNumber } from '../utils/padNumber';

export function getIniOutput(results: CardPlayer[]): string[] {
  return results.map(({ value, label, name, player }, i) => {
    const n = code(padNumber(i + 1, results.length));
    const val = code(padNumber(value, 54));
    const emoji = player ? ':angry:' : ':rage:';
    const card = code(label);
    const joker = label.includes('Joker');
    const suffix = joker ? ' :black_joker:' : '';
    return `${n}. ${val} — ${emoji} ${name} ${card}${suffix}`;
  });
}

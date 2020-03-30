import { CardPlayer } from '../interfaces/card.interface';
import { code } from '../utils/code';
import { padNumber } from '../utils/padNumber';

export function getIniOutput(results: CardPlayer[]): string[] {
  return results.map(({ label, name, player }, i) => {
    const joker = label.includes('Joker');
    const n = code(padNumber(i + 1, results.length));
    const emoji = player ? ':angry:' : ':rage:';
    const user = player ? `**${name}**` : name;
    const card = code(label);
    const suffix = joker ? ' :black_joker:' : '';
    return `${n}. ${emoji} — ${user} ${card}${suffix}`;
  });
}

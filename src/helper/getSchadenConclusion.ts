import { Schaden } from '../interfaces/schaden.interface';
import { sumNumbers } from '../utils/sumNumbers';
import { code } from '../utils/code';
import { getDamageEmoji } from '../utils/getDamageEmoji';

export function getSchadenConclusion(results: Schaden[], mod: number): string {
  const sum = sumNumbers(
    results.map(r => r.sum),
    mod
  );
  const emoji = getDamageEmoji(sum);
  const total = code(sum.toString());

  return `Du machst insgesamt ${total} ${emoji} Schaden!`;
}

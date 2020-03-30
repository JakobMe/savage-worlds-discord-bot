import { Schaden } from '../interfaces/schaden.interface';
import { code } from '../utils/code';
import { getMax } from '../utils/getMax';
import { padNumber } from '../utils/padNumber';

export function getSchadenOutput(results: Schaden[]): string[] {
  const [maxIndex] = getMax(results.map(r => r.index));
  const [maxSum] = getMax(results.map(r => r.sum));
  const [maxDie] = getMax(results.map(r => r.die));

  return results.map(({ index, die, rolls, exploded, sum }) => {
    const i = code(padNumber(index, maxIndex));
    const total = code(padNumber(sum, maxSum, 'Σ'));
    const emoji = exploded ? ':broken_heart:' : ':drop_of_blood:';
    const result = code(rolls.join(','));
    const m = padNumber(die, maxDie);
    const dice = code(`1w${m}`);

    return `${i}. ${dice} — ${emoji} ${total} Schaden, gewürfelt: ${result} `;
  });
}

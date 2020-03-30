import { Probe } from '../interfaces/probe.interface';
import { code } from '../utils/code';
import { getMax } from '../utils/getMax';
import { getRaiseEmoji } from '../utils/getRaiseEmoji';
import { padNumber } from '../utils/padNumber';

function getTitle(success: boolean, discarded: boolean): string {
  const label = discarded ? '~~Aussortiert~~' : success ? 'Erfolgreich' : 'Fehlschlag';
  return `${label}, gewürfelt:`;
}

export function getProbeOutput(results: Probe[], discarded: Probe): string[] {
  const [maxIndex] = getMax(results.map(r => r.index));
  const [maxSum] = getMax(results.map(r => r.sum));
  const [maxDie] = getMax(results.map(r => r.die));

  return results.map(({ index, die, rolls, sum, raises, success }) => {
    const i = code(padNumber(index, maxIndex));
    const total = code(padNumber(sum, maxSum, 'Σ'));
    const emoji = getRaiseEmoji(raises, success);
    const title = getTitle(success, index === discarded?.index);
    const result = code(rolls.join(','));
    const dice = code(`1w${padNumber(die, maxDie)}`);

    return `${i}. ${dice} — ${emoji} ${total} ${title} ${result} `;
  });
}

import { getReason } from '../utils/getReason';
import { signNumber } from '../utils/signNumber';

export function getSchadenTitle(type: string, mod: number, comment: string): string {
  const reason = getReason(comment);
  const dice = type.split(',').join(' + ');
  const bonus = signNumber(mod);

  return `hier sind die Ergebnisse deines Schadenswurfs${reason} mit __${dice} ${bonus}__:`;
}

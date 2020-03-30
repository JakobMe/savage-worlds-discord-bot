import { getReason } from '../utils/getReason';
import { signNumber } from '../utils/signNumber';

export function getProbeTitle(
  n: number,
  m: number,
  mod: number,
  target: number,
  comment: string
): string {
  const reason = getReason(comment);
  const bonus = signNumber(mod);

  return [
    `hier sind die Ergebnisse deiner Probe${reason} mit`,
    `__${n}w${m} ${bonus}__ auf den __Zielwert ${target}__:`
  ].join(' ');
}

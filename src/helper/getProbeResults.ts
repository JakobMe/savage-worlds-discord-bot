import { Probe } from '../interfaces/probe.interface';
import { clamp } from '../utils/clamp';
import { explodeRoll } from '../utils/explodeRoll';
import { getRaises } from '../utils/getRaises';
import { sumNumbers } from '../utils/sumNumbers';

export function getProbeResults(
  n: number,
  m: number,
  mod: number,
  target: number,
  wildcard: boolean
): Probe[] {
  const dice = new Array<number>(n).fill(m);
  const sequence = wildcard ? [6, ...dice] : dice;

  return sequence.map((die, i) => {
    const rolls = explodeRoll(die);
    const sum = clamp(sumNumbers(rolls, mod), 0, Infinity);

    return {
      index: i + 1,
      die,
      wildcard,
      target,
      mod,
      rolls,
      success: sum >= target,
      slipped: rolls[0] === 1,
      exploded: rolls.length > 1,
      raises: getRaises(sum, target),
      sum
    };
  });
}

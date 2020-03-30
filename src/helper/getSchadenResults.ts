import { Schaden } from '../interfaces/schaden.interface';
import { explodeRoll } from '../utils/explodeRoll';
import { sumNumbers } from '../utils/sumNumbers';

export function getSchadenResults(dice: number[][]): Schaden[] {
  return dice
    .reduce((sequence, [n, m]) => {
      const split = new Array<number>(n).fill(m);
      return [...sequence, ...split];
    }, [])
    .map((die, i) => {
      const index = i + 1;
      const rolls = explodeRoll(die);
      const exploded = rolls.length > 1;
      const sum = sumNumbers(rolls);
      return { index, die, rolls, exploded, sum };
    });
}

import { roll } from './roll';

export function explodeRoll(die: number): number[] {
  const rolls = roll(1, die);
  while ([...rolls].pop() === die) {
    rolls.push(roll(1, die)[0]);
  }
  return rolls;
}

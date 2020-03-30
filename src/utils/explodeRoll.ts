import { roll } from './roll';

export function explodeRoll(initial: number, die: number): number[] {
  const rolls = [initial];
  while ([...rolls].pop() === die) {
    rolls.push(roll(1, die)[0]);
  }
  return rolls;
}

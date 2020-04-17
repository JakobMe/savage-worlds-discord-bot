import { DiceRollProps, DiceRollItem, DiceRollResult } from './dice-roll.interface';

export type DamageProps = DiceRollProps;

export interface DamageItem extends DiceRollItem {
  emoji: string;
}

export interface DamageResult extends DiceRollResult {
  emoji: string;
  items: DamageItem[];
}

import { damageConfig } from '../config/damage.config';
import { DiceRoll } from './dice-roll.class';
import { DamageProps, DamageResult, DamageItem } from '../interfaces/damage.interface';
import { DiceRollItem, DiceRollResult } from '../interfaces/dice-roll.interface';

export class Damage {
  public readonly props: DamageProps;
  public readonly result: DamageResult;

  constructor(input: string, modificator?: string) {
    const { props, result } = new DiceRoll(input, modificator, true);
    this.props = props;
    this.result = this.getResult(result);
  }

  private getResult(result: DiceRollResult): DamageResult {
    const { items, sum } = result;
    return {
      ...result,
      items: this.getItems(items),
      emoji: this.getEmoji(sum)
    };
  }

  private getItems(items: DiceRollItem[]): DamageItem[] {
    return items.map(item => ({
      ...item,
      emoji: item.explode ? ':boom:' : ':drop_of_blood:'
    }));
  }

  private getEmoji(sum: number): string {
    return damageConfig.find(({ min, max }) => sum <= max && sum >= min).emoji;
  }
}

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
    if (sum >= 24) {
      return ':skull:';
    } else if (sum >= 20) {
      return ':fire:';
    } else if (sum >= 16) {
      return ':axe:';
    } else if (sum >= 12) {
      return ':crossed_swords:';
    } else if (sum >= 8) {
      return ':dagger:';
    } else if (sum >= 6) {
      return ':boxing_glove:';
    } else if (sum >= 4) {
      return ':punch:';
    } else if (sum >= 2) {
      return ':cat:';
    } else {
      return ':poop:';
    }
  }
}

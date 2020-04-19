import {
  DiceRollProps,
  DiceRollResult,
  DiceRollParsed,
  DiceRollItem
} from '../interfaces/dice-roll.interface';
import NumberUtils from '../utils/number.utils';
import StringUtils from '../utils/string.utils';

export class DiceRoll {
  public static readonly MOD_MAX = 100;
  public static readonly DICE_MAX = 20;
  public static readonly TYPES_MAX = 5;

  public static getProps(input: string, modificator: string, explode: boolean): DiceRollProps {
    const { expression, dice, sequence } = DiceRoll.parse(input);
    const mod = NumberUtils.parse(modificator);

    return {
      dice,
      sequence,
      mod,
      expression,
      explode,
      valid: DiceRoll.isValid(dice),
      allowed: DiceRoll.isAllowed(dice, sequence, mod),
      modificator: NumberUtils.sign(mod)
    };
  }

  public readonly props: DiceRollProps;
  public readonly result: DiceRollResult;

  constructor(dice: string, modificator?: string, explode = false) {
    this.props = DiceRoll.getProps(dice, modificator, explode);
    this.result = this.getResult();
  }

  private getResult(): DiceRollResult {
    const { valid, allowed } = this.props;

    if (!valid || !allowed) {
      return { items: [], rolls: [], sum: 0 };
    }

    const items = this.getItems();
    const sum = this.getSum(items);
    const rolls = items.map(i => i.rolls).flat();

    return { items, rolls, sum };
  }

  private getItems(): DiceRollItem[] {
    const { sequence, explode: doExplode } = this.props;

    return sequence.map(die => {
      const rolls = doExplode ? NumberUtils.explode(die) : NumberUtils.roll(1, die);
      const sum = NumberUtils.restrict(NumberUtils.sum(rolls), 0, Infinity);
      const explode = rolls.length > 1;

      return { die, rolls, explode, sum };
    });
  }

  private getSum(rolls: DiceRollItem[]): number {
    const { mod } = this.props;
    const sums = rolls.map(({ sum }) => sum);
    return NumberUtils.restrict(NumberUtils.sum(sums, mod), 0, Infinity);
  }

  private static isValid(dice: [number, number][]): boolean {
    return dice.every(([n, m]) => n > 0 && m > 0);
  }

  private static isAllowed(dice: [number, number][], sequence: number[], mod: number): boolean {
    return (
      sequence.length <= DiceRoll.DICE_MAX &&
      dice.length <= DiceRoll.TYPES_MAX &&
      Math.abs(mod) <= DiceRoll.MOD_MAX
    );
  }

  private static parse(input: string): DiceRollParsed {
    const { expressions, sequence, dice } = (input ?? '').split(/[,|/]/).reduce(
      ({ expressions, sequence, dice }, die) => {
        const [original, dieN, dieM] = die.match(/^(\d+)?w?(2|3|4|6|8|10|12|20|100)$/i) ?? [];
        const n = NumberUtils.parse(dieN, 1);
        const m = NumberUtils.parse(dieM, 0);
        const seq = new Array<number>(n).fill(m);
        const exp = original ? `${n}w${m}` : '';

        return {
          dice: [...dice, [n, m]],
          sequence: [...sequence, ...seq],
          expressions: [...expressions, exp]
        };
      },
      {
        dice: [],
        sequence: [],
        expressions: []
      }
    );

    return {
      dice,
      sequence,
      expression: StringUtils.enumerate(expressions)
    };
  }
}

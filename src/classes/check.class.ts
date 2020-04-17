import { DiceRoll } from './dice-roll.class';
import { CheckProps, CheckResult, CheckItem } from '../interfaces/check.interface';
import { DiceRollItem } from '../interfaces/dice-roll.interface';
import CheckUtils from '../utils/check.utils';
import NumberUtils from '../utils/number.utils';

export class Check {
  public static readonly MOD_MAX = 20;
  public static readonly GOAL_MIN = 1;
  public static readonly GOAL_MAX = 20;
  public static readonly DICE_MAX = 10;
  public static readonly ALLOWED_M = [4, 6, 8, 10, 12];
  public static readonly ALLOWED_WILD = { ja: true, nein: false };

  public readonly props: CheckProps;
  public readonly result: CheckResult;

  constructor(type: string, modificator?: string, target?: string, wild?: string) {
    this.props = this.getProps(type, modificator, target, wild);
    this.result = this.getResult();
  }

  private getProps(type: string, modificator: string, target: string, wild: string): CheckProps {
    const mod = NumberUtils.parse(modificator);
    const goal = NumberUtils.parse(target, 4);
    const wildcard = Check.ALLOWED_WILD[(wild ?? 'ja').toLowerCase()] ?? null;
    const { valid, dice } = DiceRoll.getProps(type);
    const [n, m] = dice[0];

    return {
      n,
      m,
      mod,
      goal,
      wildcard,
      modificator: NumberUtils.sign(mod),
      allowed: this.isAllowed(mod, goal, n, wildcard),
      valid: this.isValid(valid, m)
    };
  }

  private getResult(): CheckResult {
    const { n, m, valid, allowed, wildcard } = this.props;

    if (!valid || !allowed) {
      return {
        items: [],
        expression: '',
        fumble: false,
        successes: 0,
        emoji: ''
      };
    }

    const dice = wildcard ? `1w6,${n}w${m}` : `${n}w${m}`;
    const { result, props } = new DiceRoll(dice, '0', true);
    const { expression } = props;
    const items = this.getItems(result.items);
    const fumble = CheckUtils.isFumble(items);
    const { successes, emoji } = CheckUtils.getSuccesses(items);

    return { expression, items, fumble, successes, emoji };
  }

  private getItems(items: DiceRollItem[]): CheckItem[] {
    const { mod, goal } = this.props;
    const discarded = CheckUtils.getDiscarded(items);

    return items.map(({ die, rolls, explode, sum: total }, i) => {
      const sum = total + mod;
      const discard = i === discarded;
      const success = sum >= goal;
      const fumble = rolls[0] === 1;
      const raises = CheckUtils.getRaises(sum, goal);
      const outcome = CheckUtils.getOutcome(success, discard, explode);
      const emoji = CheckUtils.getEmoji(raises, success);

      return { die, sum, rolls, explode, discard, success, fumble, raises, outcome, emoji };
    });
  }

  private isAllowed(mod: number, goal: number, n: number, wildcard: boolean): boolean {
    return (
      Math.abs(mod) <= Check.MOD_MAX &&
      n <= Check.DICE_MAX &&
      goal <= Check.GOAL_MAX &&
      goal >= Check.GOAL_MIN &&
      wildcard !== null
    );
  }

  private isValid(valid: boolean, m: number): boolean {
    return valid && Check.ALLOWED_M.includes(m);
  }
}

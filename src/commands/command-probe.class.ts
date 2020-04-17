import { Check } from '../classes/check.class';
import { Command } from '../classes/command.class';
import { CheckItem } from '../interfaces/check.interface';
import NumberUtils from '../utils/number.utils';

export class CommandProbe extends Command {
  public execute(): void {
    const [type, mod] = this.args;
    const [target, wild] = this.getOptions(['ziel', 'wild']);
    const { result, props } = new Check(type, mod, target, wild);
    const { valid, allowed, modificator, goal } = props;
    const { fumble, items, expression, successes, emoji } = result;

    if (!valid) {
      this.help('probe/invalid');
      return;
    }

    if (!allowed) {
      this.reply('probe/disallowed', {
        dice: Check.DICE_MAX,
        mod: Check.MOD_MAX,
        min: Check.GOAL_MIN,
        max: Check.GOAL_MAX
      });
      return;
    }

    this.reply(fumble ? 'probe/fumble' : 'probe/default', {
      expression,
      modificator,
      goal,
      successes,
      emoji,
      items: this.getItems(items)
    });
  }

  private getItems(items: CheckItem[]): string {
    const [maxSum] = NumberUtils.max(items.map(i => i.sum));
    const [maxDie] = NumberUtils.max(items.map(i => i.die));

    return items
      .map(({ die, emoji, sum, outcome, rolls }, i) =>
        this.render('probe/item', {
          emoji,
          outcome,
          rolls,
          die: NumberUtils.pad(die, maxDie),
          sum: NumberUtils.pad(sum, maxSum),
          index: NumberUtils.pad(i + 1, items.length)
        })
      )
      .join('\n');
  }
}

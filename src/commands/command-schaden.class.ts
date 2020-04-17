import { Command } from '../classes/command.class';
import { Damage } from '../classes/damage.class';
import { DiceRoll } from '../classes/dice-roll.class';
import { DamageItem } from '../interfaces/damage.interface';
import NumberUtils from '../utils/number.utils';

export class CommandSchaden extends Command {
  public execute(): void {
    const [type, mod] = this.args;
    const { result, props } = new Damage(type, mod);
    const { expression, modificator, valid, allowed } = props;
    const { sum, rolls, emoji, items } = result;

    if (!valid) {
      this.help('wurf/invalid');
      return;
    }

    if (!allowed) {
      this.reply('wurf/disallowed', {
        types: DiceRoll.TYPES_MAX,
        dice: DiceRoll.DICE_MAX,
        mod: DiceRoll.MOD_MAX
      });
      return;
    }

    this.reply('schaden/default', {
      expression,
      modificator,
      rolls,
      sum,
      emoji,
      items: this.getItems(items)
    });
  }

  private getItems(items: DamageItem[]): string {
    const [maxSum] = NumberUtils.max(items.map(i => i.sum));
    const [maxDie] = NumberUtils.max(items.map(i => i.die));

    return items
      .map(({ rolls, sum, emoji, die }, i) =>
        this.render('schaden/item', {
          emoji,
          rolls,
          die: NumberUtils.pad(die, maxDie),
          sum: NumberUtils.pad(sum, maxSum),
          index: NumberUtils.pad(i + 1, items.length)
        })
      )
      .join('\n');
  }
}

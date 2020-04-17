import { Command } from '../classes/command.class';
import { DiceRoll } from '../classes/dice-roll.class';

export class CommandWurf extends Command {
  public execute(): void {
    const [type, mod] = this.args;
    const { result, props } = new DiceRoll(type, mod);
    const { expression, modificator, valid, allowed } = props;
    const { sum, rolls } = result;

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

    this.reply('wurf/default', { expression, modificator, rolls, sum });
  }
}

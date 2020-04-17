import { Command } from '../classes/command.class';
import NumberUtils from '../utils/number.utils';

export class CommandClear extends Command {
  public execute(): void {
    if (!this.admin) {
      return;
    }

    const [amount] = this.args;
    const input = NumberUtils.parse(amount, 99) + 1;
    const amountToDelete = NumberUtils.restrict(input, 2, 100);

    this.message.channel.bulkDelete(amountToDelete, true).catch(() => {
      this.reply('clear/error');
    });
  }
}

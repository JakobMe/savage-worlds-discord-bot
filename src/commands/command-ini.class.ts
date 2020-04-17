import { Command } from '../classes/command.class';
import { Initiative } from '../classes/initiative.class';
import { InitiativeItem } from '../interfaces/initiative.interface';
import NumberUtils from '../utils/number.utils';

export class CommandIni extends Command {
  public execute(): void {
    const [opponents] = this.args;
    const { mentions } = this;
    const { result, props } = new Initiative(mentions, opponents);
    const { valid, allowed } = props;
    const { items, players, enemies } = result;

    if (!valid) {
      this.help('ini/invalid');
      return;
    }

    if (!allowed) {
      this.reply('ini/disallowed', {
        players: Initiative.PLAYERS_MAX,
        enemies: Initiative.ENEMIES_MAX
      });
      return;
    }

    this.reply('ini/default', {
      players,
      enemies,
      items: this.getItems(items)
    });
  }

  private getItems(items: InitiativeItem[]): string {
    const [maxValue] = NumberUtils.max(items.map(i => i.value));

    return items
      .map(({ value, emoji, name, label, icon }, i) =>
        this.render('ini/item', {
          emoji,
          name,
          label,
          icon,
          value: NumberUtils.pad(value, maxValue),
          index: NumberUtils.pad(i + 1, items.length)
        })
      )
      .join('\n');
  }
}

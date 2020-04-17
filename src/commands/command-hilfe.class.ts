import { Command } from '../classes/command.class';

export class CommandHilfe extends Command {
  private static readonly ALLOWED = ['clear', 'ini', 'probe', 'schaden', 'wurf'];

  public execute(): void {
    const [cmd] = this.args;
    const command = (cmd || '').toLowerCase();
    const name = CommandHilfe.ALLOWED.includes(command) ? command : 'default';
    this.reply(`hilfe/${name}`);
  }
}

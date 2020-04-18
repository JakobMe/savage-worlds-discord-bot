import { Message } from 'discord.js';
import { Command } from './command.class';
import { CommandClear } from '../commands/command-clear.class';
import { CommandHilfe } from '../commands/command-hilfe.class';
import { CommandIni } from '../commands/command-ini.class';
import { CommandProbe } from '../commands/command-probe.class';
import { CommandSchaden } from '../commands/command-schaden.class';
import { CommandWurf } from '../commands/command-wurf.class';

export class CommandFactory {
  public readonly command: Command;

  constructor(message: Message, url: string) {
    switch (Command.getCommandName(message)) {
      case 'clear':
        this.command = new CommandClear(message, url);
        break;
      case 'hilfe':
        this.command = new CommandHilfe(message, url);
        break;
      case 'ini':
        this.command = new CommandIni(message, url);
        break;
      case 'probe':
        this.command = new CommandProbe(message, url);
        break;
      case 'schaden':
        this.command = new CommandSchaden(message, url);
        break;
      case 'wurf':
        this.command = new CommandWurf(message, url);
        break;
      default:
        this.command = null;
        break;
    }
  }
}

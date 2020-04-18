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

  constructor(message: Message) {
    switch (Command.getCommandName(message)) {
      case 'clear':
        this.command = new CommandClear(message);
        break;
      case 'hilfe':
        this.command = new CommandHilfe(message);
        break;
      case 'ini':
        this.command = new CommandIni(message);
        break;
      case 'probe':
        this.command = new CommandProbe(message);
        break;
      case 'schaden':
        this.command = new CommandSchaden(message);
        break;
      case 'wurf':
        this.command = new CommandWurf(message);
        break;
      default:
        this.command = null;
        break;
    }
  }
}

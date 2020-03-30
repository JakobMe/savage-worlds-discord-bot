import { Message } from 'discord.js';
import { clear } from './clear';
import { hilfe } from './hilfe';
import { probe } from './probe';
import { schaden } from './schaden';
import { wurf } from './wurf';
import { parseMessage } from '../utils/parseMessage';
import { getOptions } from '../utils/getOptions';

export function executeCommand(message: Message): void {
  const { command, args, comment, options } = parseMessage(message);

  switch (command) {
    case 'wurf': {
      const [type, modificator] = args;
      const { reply } = wurf(type, modificator, comment);
      message.reply(reply);
      break;
    }
    case 'probe': {
      const [type, modificator] = args;
      const [goal, wild] = getOptions(options, ['ziel', 'wild']);
      const { reply } = probe(type, modificator, goal, wild, comment);
      message.reply(reply);
      break;
    }
    case 'schaden': {
      const [type, modificator] = args;
      const { reply } = schaden(type, modificator, comment);
      message.reply(reply);
      break;
    }
    case 'clear': {
      const [amount] = args;
      clear(message, amount);
      break;
    }
    case 'hilfe': {
      const { reply } = hilfe();
      message.reply(reply);
      break;
    }
    default:
      break;
  }
}

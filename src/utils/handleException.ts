import { TextChannel, DMChannel, Client } from 'discord.js';
import { log } from './log';
import config from '../config.json';

export function handleException(
  { name, message }: Error,
  bot: Client,
  channel: TextChannel | DMChannel
): void {
  const error = `${name}: ${message}`;
  const reply = ['Oh nein, es ist irgendein Fehler aufgetreten! 🤯', `\`\`\`${error}\`\`\``];

  log(bot.user, error);

  channel
    .send(reply.join(''))
    .then(() => bot.destroy())
    .then(() => bot.login(config.token));
}

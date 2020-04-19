import { gray, green, blue, red } from 'colors';
import { Client, TextChannel, DMChannel, NewsChannel, Message } from 'discord.js';
import moment from 'moment-timezone';
import { templates } from '../classes/templates.class';

function userIsAdmin(message: Message): boolean {
  return message.member?.hasPermission('ADMINISTRATOR') === true;
}

function getTimestamp(): string {
  return moment().tz('Europe/Berlin').format('DD.MM.YYYY HH:mm:ss');
}

function logToConsole(user: string, message: string, error = false): void {
  const timestamp = gray(`[${getTimestamp()}]`);
  const username = blue(user);
  const content = (error ? red : green)(`> ${message}`);
  console.log(`${timestamp} ${username} ${content}`);
}

async function handleException(
  err: Error,
  bot: Client,
  token: string,
  channel: TextChannel | DMChannel | NewsChannel
): Promise<void> {
  const error = `${err.name}: ${err.message}`;
  const reply = templates.render('misc/exception', { error });

  logToConsole(bot.user.tag, error, true);

  await channel.send(reply);
  bot.destroy();
  bot.login(token);
}

const MetaUtils = {
  timestamp: getTimestamp,
  log: logToConsole,
  exception: handleException,
  isAdmin: userIsAdmin
};

export default MetaUtils;

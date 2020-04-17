import { gray, green, blue, red } from 'colors';
import { User, Client, TextChannel, DMChannel, NewsChannel, GuildMember } from 'discord.js';
import moment from 'moment';
import { templates } from '../classes/templates.class';

function userIsAdmin(member: GuildMember): boolean {
  return member.hasPermission('ADMINISTRATOR');
}

function getUsername(user: User): string {
  return user.bot ? user.username : user.presence?.member.displayName ?? user.username;
}

function getTimestamp(): string {
  return moment().format('DD.MM.YYYY HH:mm:ss');
}

function logToConsole(user: string, message: string, error = false): void {
  const timestamp = gray(`[${getTimestamp()}]`);
  const username = blue(user);
  const content = (error ? red : green)(`> ${message}`);
  console.log(`${timestamp}\t${username}\t\t ${content}`);
}

export async function handleException(
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
  isAdmin: userIsAdmin,
  username: getUsername
};

export default MetaUtils;

import { Message } from 'discord.js';
import { log } from './log';
import { Command, CommandOption } from '../interfaces/command.interface';

const COMMENT_CHARS = /"/g;
const COMMENT_REGEX = /"(.*)"/g;
const OPTIONS_REGEX = /--(\D+) +(\w+)/g;
const PREFIX_REGEX = /^!/;
const MENTION_REGEX = /<@!(.*)>/g;

export function parseMessage(message: Message): Command {
  const { content, author } = message;
  const user = author.tag;
  const prefixed = !!content.match(PREFIX_REGEX);
  const input = content.replace(PREFIX_REGEX, '');
  const comment = input.match(COMMENT_REGEX)?.[0]?.replace(COMMENT_CHARS, '') ?? '';
  const options: CommandOption[] = [
    ...input.matchAll(OPTIONS_REGEX)
  ].map(([expression, key, value]) => ({ expression, key, value }));

  const [command, ...args] = input
    .replace(COMMENT_REGEX, '')
    .replace(OPTIONS_REGEX, '')
    .replace(MENTION_REGEX, '')
    .toLowerCase()
    .split(/ +/);

  if (prefixed) {
    log(author, content);
    return { command, args, options, user, comment };
  }

  return {
    user: 'none',
    command: 'none',
    comment: '',
    args: [],
    options: []
  };
}

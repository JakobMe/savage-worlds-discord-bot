import { Client, Message, TextChannel, DMChannel } from 'discord.js';
import { executeCommand } from './commands';
import config from './config.json';
import { log } from './utils/log';
import { handleException } from './utils/handleException';

let channel: TextChannel | DMChannel;
const bot = new Client();

bot.on('message', (message: Message) => {
  channel = message.channel;
  executeCommand(message);
});

bot.on('ready', () => {
  log(bot.user, 'I am ready!');
});

bot.login(config.token);

process.on('SIGINT', () => {
  bot.destroy();
});

process.on('uncaughtException', (error: Error) => {
  handleException(error, bot, channel);
});

import { Client, TextChannel, DMChannel, NewsChannel, Message } from 'discord.js';
import { CommandFactory } from './command-factory.class';
import MetaUtils from '../utils/meta.utils';

export class Program {
  private readonly bot: Client;
  private readonly token: string;
  private channel: TextChannel | DMChannel | NewsChannel;

  constructor(bot: Client, token: string) {
    this.bot = bot;
    this.token = token;
    this.initBotListeners();
    this.initProcessListeners();
  }

  public start(): void {
    this.bot.login(this.token);
  }

  private initBotListeners(): void {
    this.bot.on('message', (message: Message) => {
      const { command } = new CommandFactory(message);
      this.channel = message.channel;
      command?.execute();
    });

    this.bot.on('ready', () => {
      MetaUtils.log(this.bot.user, 'I am ready!');
    });
  }

  private initProcessListeners(): void {
    process.on('SIGINT', () => {
      this.bot.destroy();
    });

    process.on('uncaughtException', (error: Error) => {
      MetaUtils.exception(error, this.bot, this.token, this.channel);
    });
  }
}

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

  private exit(): void {
    this.bot.destroy();
    this.log('I am logging out!');
    process.removeAllListeners();
  }

  private initBotListeners(): void {
    this.bot
      .on('ready', () => this.log('I am ready!'))
      .on('message', (message: Message) => {
        this.channel = message.channel;
        const { command } = new CommandFactory(message);
        command?.execute();
      });
  }

  private initProcessListeners(): void {
    process
      .on('exit', () => this.exit())
      .on('SIGINT', () => this.exit())
      .on('SIGTERM', () => this.exit())
      .on('uncaughtException', (error: Error) => {
        MetaUtils.exception(error, this.bot, this.token, this.channel);
      });
  }

  private log(message: string): void {
    MetaUtils.log(this.bot.user.tag, message);
  }
}

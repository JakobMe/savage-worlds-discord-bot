import { Message, MessageOptions } from 'discord.js';
import { templates } from './templates.class';
import { CommandOption, CommandProps } from '../interfaces/command.interface';
import { TemplateData } from '../interfaces/template.interface';
import MetaUtils from '../utils/meta.utils';

export abstract class Command {
  private static readonly REGEX_SPLIT = / +/;
  private static readonly REGEX_NAME = /^!([a-z]+)/;
  private static readonly REGEX_QUERY = /"([\wäöüß: ]+)"/i;
  private static readonly REGEX_OPTIONS = /!([a-zA-Z]+) +([\w+-]+)/g;

  protected readonly message: Message;
  protected readonly command: string;
  protected readonly args: string[];
  protected readonly query: string;
  protected readonly user: string;
  protected readonly mentions: string[];
  protected readonly options: CommandOption[];

  public static getCommandName(message: Message): string {
    return message.content.match(Command.REGEX_NAME)?.[1] ?? 'none';
  }

  constructor(message: Message) {
    const { command, args, query, user, options, mentions } = this.parseMessage(message);
    this.message = message;
    this.command = command;
    this.args = args;
    this.query = query;
    this.user = user;
    this.mentions = mentions;
    this.options = options;
    this.log();
  }

  public abstract execute(): void;

  protected reply(template: string | string[], data?: TemplateData): Promise<Message> {
    return this.message.reply(this.render(template, data));
  }

  protected send(options: MessageOptions): Promise<Message> {
    return this.message.channel.send(options);
  }

  protected render(template: string | string[], data?: TemplateData): string {
    return templates.render(template, data);
  }

  protected help(template: string): void {
    this.reply([template, `hilfe/${this.command}`]);
  }

  protected getOptions(keys: string[]): string[] {
    return keys
      .map(key => key.toLowerCase())
      .map(key => this.options.find(o => o.key === key)?.value ?? null);
  }

  protected get admin(): boolean {
    return MetaUtils.isAdmin(this.message.member);
  }

  private parseMessage(message: Message): CommandProps {
    const user = message.author.tag;
    const command = Command.getCommandName(message);
    const input = message.content.replace(Command.REGEX_NAME, '').trim();
    const mentions = message.mentions.users.array().map(user => MetaUtils.username(user));

    return {
      user,
      command,
      mentions,
      args: this.parseArgs(input),
      query: this.parseQuery(input),
      options: this.parseOptions(input)
    };
  }

  private parseOptions(input: string): CommandOption[] {
    return [...input.matchAll(Command.REGEX_OPTIONS)].map(([input, key, value]) => ({
      key: key.toLowerCase(),
      input,
      value
    }));
  }

  private parseArgs(input: string): string[] {
    return input
      .toLowerCase()
      .replace(Command.REGEX_QUERY, '')
      .trim()
      .replace(Command.REGEX_OPTIONS, '')
      .trim()
      .split(Command.REGEX_SPLIT);
  }

  private parseQuery(input: string): string {
    return [...input.matchAll(Command.REGEX_QUERY)][0]?.[1] ?? '';
  }

  private log(): void {
    const { author, content } = this.message;
    MetaUtils.log(author, content);
  }
}

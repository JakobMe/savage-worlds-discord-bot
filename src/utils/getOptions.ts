import { CommandOption } from '../interfaces/command.interface';

export function getOptions(options: CommandOption[], keys: string[]): string[] {
  return keys.map(key => options.find(o => o.key === key)?.value ?? undefined);
}

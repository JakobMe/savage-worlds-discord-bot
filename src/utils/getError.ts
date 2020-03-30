import { CommandError } from '../interfaces/command.interface';

export function getError(errors: CommandError[]): CommandError {
  return errors.find(e => e.condition) ?? null;
}

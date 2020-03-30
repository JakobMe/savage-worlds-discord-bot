export interface Command {
  user: string;
  command: string;
  args: string[];
  comment: string;
  options: CommandOption[];
}

export interface CommandOption {
  expression: string;
  key: string;
  value: string;
}

export interface CommandOutput {
  reply: string;
}

export interface CommandError extends CommandOutput {
  condition: boolean;
}

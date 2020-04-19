export interface CommandProps {
  user: string;
  args: string[];
  query: string;
  command: string;
  mentions: string[];
  options: CommandOption[];
}

export interface CommandOption {
  input: string;
  key: string;
  value: string;
}

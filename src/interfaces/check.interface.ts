export interface CheckProps {
  n: number;
  m: number;
  mod: number;
  modificator: string;
  goal: number;
  reason: string;
  wildcard: boolean;
  valid: boolean;
  allowed: boolean;
}

export interface CheckItem {
  die: number;
  success: boolean;
  fumble: boolean;
  explode: boolean;
  discard: boolean;
  outcome: string;
  sum: number;
  raises: number;
  emoji: string;
  rolls: number[];
}

export interface CheckResult {
  expression: string;
  fumble: boolean;
  successes: number;
  emoji: string;
  items: CheckItem[];
}

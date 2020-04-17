export interface DiceRollParsed {
  dice: [number, number][];
  sequence: number[];
  expression: string;
}

export interface DiceRollProps extends DiceRollParsed {
  mod: number;
  explode: boolean;
  valid: boolean;
  allowed: boolean;
  modificator: string;
}

export interface DiceRollItem {
  die: number;
  rolls: number[];
  explode: boolean;
  sum: number;
}

export interface DiceRollResult {
  items: DiceRollItem[];
  rolls: number[];
  sum: number;
}

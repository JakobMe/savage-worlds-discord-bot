export interface Card {
  label: string;
  value: number;
}

export type CardPlayerType = 'player' | 'enemy';

export interface CardPlayer extends Card {
  name: string;
  player: boolean;
}

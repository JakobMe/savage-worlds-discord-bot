import { Card } from './card.interface';

export interface InitiativeProps {
  users: string[];
  enemies: number;
  valid: boolean;
  allowed: boolean;
}

export interface InitiativeItem extends Card {
  name: string;
  player: boolean;
  emoji: string;
}

export interface InitiativeResult {
  players: number;
  enemies: number;
  items: InitiativeItem[];
}

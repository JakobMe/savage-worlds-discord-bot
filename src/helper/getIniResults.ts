import { User } from 'discord.js';
import { cards } from '../data/cards';
import { CardPlayer } from '../interfaces/card.interface';
import { getName } from '../utils/getName';
import { randomItems } from '../utils/randomItem';
import { sortBy } from '../utils/sortBy';

export function getIniResults(players: User[], enemies: number): CardPlayer[] {
  const size = players.length + enemies;
  const list = randomItems(cards, size);

  const cardsEnemies: CardPlayer[] = list.slice(0, enemies).map((card, i) => ({
    ...card,
    player: false,
    name: `Gegner ${i + 1}`
  }));

  const cardsPlayers: CardPlayer[] = list.slice(enemies).map((card, i) => ({
    ...card,
    player: true,
    name: `${getName(players[i])}`
  }));

  return sortBy([...cardsEnemies, ...cardsPlayers], 'value', true);
}

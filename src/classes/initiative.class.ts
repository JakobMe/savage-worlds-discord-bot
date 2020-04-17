import { cardsConfig } from '../config/cards.config';
import {
  InitiativeProps,
  InitiativeResult,
  InitiativeItem
} from '../interfaces/initiative.interface';
import ArrayUtils from '../utils/array.utils';
import NumberUtils from '../utils/number.utils';

export class Initiative {
  public static readonly PLAYERS_MAX = 10;
  public static readonly ENEMIES_MAX = 20;

  public readonly props: InitiativeProps;
  public readonly result: InitiativeResult;

  constructor(users: string[], opponents: string) {
    this.props = this.getProps(users, opponents);
    this.result = this.getResult();
  }

  private getProps(users: string[], opponents: string): InitiativeProps {
    const enemies = NumberUtils.parse(opponents);
    return {
      users,
      enemies,
      valid: Initiative.isValid(users, enemies),
      allowed: Initiative.isAllowed(users, enemies)
    };
  }

  private getResult(): InitiativeResult {
    const { valid, allowed, users, enemies } = this.props;

    if (!valid || !allowed) {
      return {
        players: 0,
        enemies: 0,
        items: []
      };
    }

    return {
      enemies,
      players: users.length,
      items: this.getItems()
    };
  }

  private getItems(): InitiativeItem[] {
    const { users, enemies } = this.props;
    const size = users.length + enemies;
    const list = ArrayUtils.randomItems(cardsConfig, size);

    const cardsEnemies: InitiativeItem[] = list.slice(0, enemies).map((card, i) => ({
      ...card,
      player: false,
      name: `Gegner ${NumberUtils.pad(i + 1, enemies)}`,
      emoji: ':rage:'
    }));

    const cardsPlayers: InitiativeItem[] = list.slice(enemies).map((card, i) => ({
      ...card,
      player: true,
      name: users[i],
      emoji: ':angry:'
    }));

    return ArrayUtils.sortBy([...cardsEnemies, ...cardsPlayers], 'value', true);
  }

  private static isValid(users: string[], enemies: number): boolean {
    return users.length > 0 || enemies > 0;
  }

  private static isAllowed(users: string[], enemies: number): boolean {
    return users.length <= Initiative.PLAYERS_MAX && enemies <= Initiative.ENEMIES_MAX;
  }
}

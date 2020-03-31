import { User } from 'discord.js';

export function getName(user: User): string {
  return user.bot
    ? user.username
    : user?.presence?.member?.displayName ?? user?.username ?? 'unbekannt';
}

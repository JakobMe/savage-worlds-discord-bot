import { User } from 'discord.js';

export const mockUser = (tag = 'user', bot = false): User =>
  (({
    tag,
    bot,
    username: 'Testuser'
  } as unknown) as User);

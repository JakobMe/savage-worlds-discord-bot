import { User } from 'discord.js';
import { mockMember } from './member.mock';

export const mockUser = (tag = 'user', bot = false, presence = false): User =>
  (({
    tag,
    bot,
    username: 'Testuser',
    presence: presence ? { member: mockMember() } : null
  } as unknown) as User);

import { Message, User } from 'discord.js';
import { mockChannel } from './channel.mock';
import { mockMember } from './member.mock';
import { mockUser } from './user.mock';

export const mockMessage = (content: string, admin = true, tag = 'user'): Message =>
  (({
    content,
    channel: mockChannel(),
    author: mockUser(tag),
    member: mockMember(admin),
    reply: jest.fn().mockResolvedValue(null),
    send: jest.fn().mockResolvedValue(null),
    mentions: {
      users: {
        array: (): User[] => [mockUser(tag)]
      }
    }
  } as unknown) as Message);

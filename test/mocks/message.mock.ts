import { Message, GuildMember, User } from 'discord.js';
import { mockChannel } from './channel.mock';
import { mockMember } from './member.mock';
import { mockUser } from './user.mock';

export const mockMessage = (
  content: string,
  admin = true,
  tag = 'user',
  mentions = 0,
  dm = false
): Message =>
  (({
    content,
    channel: mockChannel(dm),
    author: mockUser(tag),
    member: dm ? null : mockMember(admin),
    reply: jest.fn().mockResolvedValue(null),
    send: jest.fn().mockResolvedValue(null),
    mentions: {
      users: {
        array: (): User[] => [...Array(mentions).keys()].map(() => mockUser())
      },
      members: dm
        ? null
        : {
            array: (): GuildMember[] => [...Array(mentions).keys()].map(() => mockMember())
          }
    }
  } as unknown) as Message);

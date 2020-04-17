import { GuildMember } from 'discord.js';

export const mockMember = (admin = true): GuildMember =>
  (({
    hasPermission: jest.fn().mockReturnValue(admin),
    displayName: 'Testmember'
  } as unknown) as GuildMember);

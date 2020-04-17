import { TextChannel } from 'discord.js';

export const mockChannel = (): TextChannel =>
  (({
    send: jest.fn().mockResolvedValue(true),
    bulkDelete: jest.fn().mockRejectedValue(false)
  } as unknown) as TextChannel);

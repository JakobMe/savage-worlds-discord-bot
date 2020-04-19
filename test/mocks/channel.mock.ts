import { TextChannel } from 'discord.js';

export const mockChannel = (dm = false): TextChannel =>
  (({
    type: dm ? 'dm' : 'text',
    send: jest.fn().mockResolvedValue(true),
    bulkDelete: jest.fn().mockRejectedValue(false)
  } as unknown) as TextChannel);

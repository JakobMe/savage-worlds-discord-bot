import { Client } from 'discord.js';
import { mockMessage } from './message.mock';
import { mockUser } from './user.mock';

export const mockBot = (message = 'test'): Client => {
  const bot = ({
    user: mockUser(),
    destroy: jest.fn(),
    login: jest.fn(),
    on: jest.fn().mockImplementation((event, cb) => {
      cb(mockMessage(message));
      return bot;
    })
  } as unknown) as Client;
  return bot;
};

import { Client } from 'discord.js';
import { mockMessage } from './message.mock';
import { mockUser } from './user.mock';

export const mockBot = (message = 'test'): Client =>
  (({
    user: mockUser(),
    destroy: jest.fn(),
    login: jest.fn(),
    on: jest.fn().mockImplementation((event, cb) => {
      cb(mockMessage(message));
    })
  } as unknown) as Client);

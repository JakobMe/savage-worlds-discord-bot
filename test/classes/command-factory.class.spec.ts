import https from 'https';
import { mockLog, resetMockLog } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { Command } from '../../src/classes/command.class';
import { CommandFactory } from '../../src/classes/command-factory.class';

describe('CommandFactory', () => {
  const url = 'https://www.google.com';
  const get = jest.spyOn(https, 'get');
  const commands = ['!clear', '!hilfe', '!ini', '!probe', '!schaden', '!wurf'];

  it('should initialize command on valid message', () => {
    const log = mockLog();

    commands.forEach((cmd, i) => {
      const { command } = new CommandFactory(mockMessage(cmd), url);
      expect(command instanceof Command).toBe(true);
      expect(log).toBeCalledTimes(i + 1);
      expect(get).toHaveBeenNthCalledWith(i + 1, url);
    });

    resetMockLog();
  });

  it('should not initialize command on unknown command', () => {
    const { command } = new CommandFactory(mockMessage('!unknown'), url);
    expect(command instanceof Command).toBe(false);
    expect(get).toHaveBeenCalledTimes(commands.length);
  });

  it('should not initialize command on invalid message', () => {
    const { command } = new CommandFactory(mockMessage('invalid'), url);
    expect(command instanceof Command).toBe(false);
    expect(get).toHaveBeenCalledTimes(commands.length);
  });
});

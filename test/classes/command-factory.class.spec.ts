import { mockLog, resetMockLog } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { Command } from '../../src/classes/command.class';
import { CommandFactory } from '../../src/classes/command-factory.class';

describe('CommandFactory', () => {
  it('should initialize command on valid message', () => {
    const log = mockLog();
    const commands = ['!clear', '!hilfe', '!ini', '!probe', '!schaden', '!wurf'];

    commands.forEach((cmd, i) => {
      const { command } = new CommandFactory(mockMessage(cmd));
      expect(command instanceof Command).toBe(true);
      expect(log).toBeCalledTimes(i + 1);
    });

    resetMockLog();
  });

  it('should not initialize command on unknown command', () => {
    const { command } = new CommandFactory(mockMessage('!unknown'));
    expect(command instanceof Command).toBe(false);
  });

  it('should not initialize command on invalid message', () => {
    const { command } = new CommandFactory(mockMessage('invalid'));
    expect(command instanceof Command).toBe(false);
  });
});

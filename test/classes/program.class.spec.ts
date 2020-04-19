import { Program } from '../../src/classes/program.class';
import { mockBot } from '../mocks/bot.mock';
import { mockLog, resetMockLog } from '../mocks/log.mock';

describe('Program', () => {
  it('should initialize listeners and login bot', () => {
    const mockProcessOn = jest.spyOn(process, 'on');
    const log = mockLog();
    const bot = mockBot();

    new Program(bot, 'token').start();

    expect(bot.on).toHaveBeenCalledTimes(2);
    expect(bot.login).toHaveBeenCalledTimes(1);
    expect(mockProcessOn).toHaveBeenCalledTimes(4);
    expect(log).toHaveBeenCalledWith(expect.stringMatching('I am ready'));

    mockProcessOn.mockClear();
    resetMockLog();
  });

  it('should react to command message', () => {
    const log = mockLog();
    const bot = mockBot('!hilfe');

    new Program(bot, 'token').start();

    expect(log).toHaveBeenCalledWith(expect.stringMatching('!hilfe'));
    resetMockLog();
  });

  it('should logout when process ends', () => {
    const log = mockLog();
    const bot = mockBot();
    const mockProcessOn = jest.spyOn(process, 'on').mockImplementation((event, listener) => {
      listener('resolve', null, null);
      return process;
    });

    new Program(bot, 'token').start();

    expect(bot.destroy).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(expect.stringMatching('I am logging out'));

    mockProcessOn.mockClear();
    resetMockLog();
  });

  it('should log error on exception', () => {
    const log = mockLog();
    const bot = mockBot();
    const mockProcessOn = jest.spyOn(process, 'on').mockImplementation((event, listener) => {
      const value = ({ name: 'Error', message: 'Test' } as unknown) as NodeJS.MultipleResolveType;
      listener(value, null, null);
      return process;
    });

    new Program(bot, 'token').start();
    expect(log).toHaveBeenCalledWith(expect.stringMatching('Error: Test'));

    mockProcessOn.mockClear();
    resetMockLog();
  });
});

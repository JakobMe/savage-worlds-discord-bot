import { mockBot } from '../mocks/bot.mock';
import { mockChannel } from '../mocks/channel.mock';
import { mockError } from '../mocks/error.mock';
import { mockLog, resetMockLog } from '../mocks/log.mock';
import { mockUser } from '../mocks/user.mock';
import MetaUtils from '../../src/utils/meta.utils';
import { mockMessage } from '../mocks/message.mock';

describe('MetaUtils', () => {
  test('userIsAdmin should return correct value in text channel', () => {
    const message = mockMessage('', true);
    const isAdmin = MetaUtils.isAdmin(message);
    expect(message.member.hasPermission).toHaveBeenCalledWith('ADMINISTRATOR');
    expect(isAdmin).toBe(true);
  });

  test('userIsAdmin should return correct value in direct message', () => {
    const message = mockMessage('', true, 'user', 0, true);
    const isAdmin = MetaUtils.isAdmin(message);
    expect(isAdmin).toBe(false);
  });

  test('getTimestamp should return correctly formatted string', () => {
    const timestamp = MetaUtils.timestamp();
    expect(timestamp).toMatch(/\d\d\.\d\d\.\d\d\d\d \d\d:\d\d:\d\d/);
  });

  test('logToConsole should log to console', () => {
    const user = mockUser();
    const log = mockLog();
    MetaUtils.log(user.tag, 'message');
    expect(log).toHaveBeenCalled();
    resetMockLog();
  });

  test('handleException should call channel and bot functions', async () => {
    mockLog();
    const bot = mockBot();
    const channel = mockChannel();
    await MetaUtils.exception(mockError(), bot, 'token', channel);
    expect(channel.send).toHaveBeenCalled();
    expect(bot.destroy).toHaveBeenCalled();
    expect(bot.login).toHaveBeenCalled();
    resetMockLog();
  });
});

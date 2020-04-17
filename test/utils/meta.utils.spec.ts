import { mockBot } from '../mocks/bot.mock';
import { mockChannel } from '../mocks/channel.mock';
import { mockError } from '../mocks/error.mock';
import { mockLog, resetMockLog } from '../mocks/log.mock';
import { mockMember } from '../mocks/member.mock';
import { mockUser } from '../mocks/user.mock';
import MetaUtils from '../../src/utils/meta.utils';

describe('MetaUtils', () => {
  test('userIsAdmin should call hasPermission of discord member', () => {
    const member = mockMember();
    const isAdmin = MetaUtils.isAdmin(member);
    expect(member.hasPermission).toHaveBeenCalledWith('ADMINISTRATOR');
    expect(isAdmin).toBe(true);
  });

  test('getUsername should return correct username', () => {
    const user1 = mockUser();
    const user2 = mockUser('user', true);
    const user3 = mockUser('user', false, true);
    expect(MetaUtils.username(user1)).toBe('Testuser');
    expect(MetaUtils.username(user2)).toBe('Testuser');
    expect(MetaUtils.username(user3)).toBe('Testmember');
  });

  test('getTimestamp should return correctly formatted string', () => {
    const timestamp = MetaUtils.timestamp();
    expect(timestamp).toMatch(/\d\d\.\d\d\.\d\d\d\d \d\d:\d\d:\d\d/);
  });

  test('logToConsole should log to console', () => {
    const user = mockUser();
    const log = mockLog();
    MetaUtils.log(user, 'message');
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

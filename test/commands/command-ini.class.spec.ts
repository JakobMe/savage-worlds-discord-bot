import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandIni } from '../../src/commands/command-ini.class';

describe('CommandIni', () => {
  mockLogForEach();

  it('should reply on success with only enemies', () => {
    const message = mockMessage('!ini 5');
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('und 5 Gegner'));
  });

  it('should reply on success with only players', () => {
    const message = mockMessage('!ini', false, 'user', 3);
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('für 3 Spieler'));
  });

  it('should reply on success with players and enemis', () => {
    const message = mockMessage('!ini 2', false, 'user', 1);
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('für 1 Spieler und 2 Gegner'));
  });

  it('should reply on invalid params', () => {
    const message = mockMessage('!ini');
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('mindestens einen Spieler'));
  });

  it('should reply on disallowed players', () => {
    const message = mockMessage('!ini', false, 'user', 20);
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('es dürfen maximal'));
  });

  it('should reply on disallowed enemies', () => {
    const message = mockMessage('!ini 50');
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('es dürfen maximal'));
  });

  it('should reply on direct message', () => {
    const message = mockMessage('!ini', false, 'user', 4, true);
    new CommandIni(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('für 4 Spieler'));
  });
});

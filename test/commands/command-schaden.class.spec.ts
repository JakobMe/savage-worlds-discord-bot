import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandSchaden } from '../../src/commands/command-schaden.class';

describe('CommandSchaden', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!schaden 2w6,w4 +2');
    new CommandSchaden(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('Ergebnisse deines Schadenswurfs')
    );
  });

  it('should reply on invalid dice', () => {
    const message = mockMessage('!schaden k');
    new CommandSchaden(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('mit solchen Würfeln'));
  });

  it('should reply on disallowed dice', () => {
    const message = mockMessage('!schaden 30w6');
    new CommandSchaden(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('es sind maximal'));
  });
});

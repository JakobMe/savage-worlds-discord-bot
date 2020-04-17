import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandWurf } from '../../src/commands/command-wurf.class';

describe('CommandWurf', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!wurf 2w6,1w4 +2');
    new CommandWurf(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('dein Würfelergebnis'));
  });

  it('should reply on invalid dice', () => {
    const message = mockMessage('!wurf k');
    new CommandWurf(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('mit solchen Würfeln'));
  });

  it('should reply on disallowed dice', () => {
    const message = mockMessage('!wurf 30w6');
    new CommandWurf(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('es sind maximal'));
  });
});

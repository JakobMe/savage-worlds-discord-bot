import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { resetMockRandom, mockRandom } from '../mocks/random.mock';
import { CommandProbe } from '../../src/commands/command-probe.class';

describe('CommandProbe', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!probe w8');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('Ergebnisse deiner Probe mit 1w6 und 1w8')
    );
  });

  it('should reply on success with complex command', () => {
    const message = mockMessage('!probe 2w6 +2 "Athletik" !wild 4 !ziel 3');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('Ergebnisse deiner Probe für "Athletik" mit 1w4 und 2w6')
    );
  });

  it('should reply on fumble', () => {
    mockRandom(0);
    const message = mockMessage('!probe 1w6');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('kritischen Fehlschlag'));
    resetMockRandom();
  });

  it('should reply on invalid dice', () => {
    const message = mockMessage('!probe k');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('mit solchen Würfeln'));
  });

  it('should reply on disallowed dice', () => {
    const message = mockMessage('!probe 30w6');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('es sind maximal'));
  });
});

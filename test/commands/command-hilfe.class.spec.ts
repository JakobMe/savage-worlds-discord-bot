import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandHilfe } from '../../src/commands/command-hilfe.class';

describe('CommandHilfe', () => {
  mockLogForEach();

  it('should reply default without argument', () => {
    const message = mockMessage('!hilfe');
    new CommandHilfe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('folgende Befehle'));
  });

  it('should reply default with invalid argument', () => {
    const message = mockMessage('!hilfe unknown');
    new CommandHilfe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('folgende Befehle'));
  });

  it('should reply with specific text with valid argument', () => {
    const message = mockMessage('!hilfe wurf');
    new CommandHilfe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(expect.stringMatching('so funktioniert der Befehl'));
  });
});

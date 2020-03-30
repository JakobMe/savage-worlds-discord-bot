import { CommandOutput } from '../interfaces/command.interface';

export function hilfe(): CommandOutput {
  return {
    reply: [
      'es gibt folgende __Befehle__ 🤖:',
      '',
      '📄 Hilfe anzeigen: `!hilfe`',
      '🎲 Würfelwurf: `!wurf <würfel> [mod] ["text"]`',
      '🧰 Probenwurf: `!probe <würfel> [mod] [--ziel <wert>] [--wild <ja|nein>] ["text"]`',
      '❌ Nachrichten löschen (nur Admin): `!clear [anzahl]`',
      '',
      'Hier ein paar __Beispiele__:',
      '',
      '`!wurf 1w10`',
      '`!wurf 2w8 +2`',
      '`!probe 1w6 "Heimlichkeit"`',
      '`!probe 2w10 +2 --ziel 6 "Kämpfen"`',
      '`!probe 1w4 --wild nein`',
      '`!clear 4`'
    ].join('\n')
  };
}

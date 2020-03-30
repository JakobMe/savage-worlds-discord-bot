import { MessageMentions } from 'discord.js';
import { getIniOutput } from '../helper/getIniOutput';
import { getIniResults } from '../helper/getIniResults';
import { CommandOutput } from '../interfaces/command.interface';
import { toInteger } from '../utils/toInteger';
import { getError } from '../utils/getError';

const PLAYERS_MIN = 1;
const PLAYERS_MAX = 10;
const ENEMIES_MIN = 1;
const ENEMIES_MAX = 20;

export function ini(mentions: MessageMentions, opponents: string): CommandOutput {
  const users = mentions.users.array();
  const players = users.length;
  const enemies = toInteger(opponents, 0);

  const error = getError([
    {
      condition: players < PLAYERS_MIN || players > PLAYERS_MAX,
      reply: `erwähne zwischen ${PLAYERS_MIN} und ${PLAYERS_MAX} Spieler.`
    },
    {
      condition: enemies < ENEMIES_MIN || enemies > ENEMIES_MAX,
      reply: `die Anzahl der Gegner muss zwischen ${ENEMIES_MIN} und ${ENEMIES_MAX} liegen.`
    }
  ]);

  if (error) {
    return error;
  }

  const results = getIniResults(users, enemies);
  const output = getIniOutput(results);

  return {
    reply: [
      'hier ist die __Initiative-Reihenfolge__ aller Spieler und Gegner und ihre gezogenen Karten:',
      '',
      ...output
    ].join('\n')
  };
}

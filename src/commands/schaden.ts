import { getSchadenConclusion } from '../helper/getSchadenConclusion';
import { getSchadenOutput } from '../helper/getSchadenOutput';
import { getSchadenResults } from '../helper/getSchadenResults';
import { getSchadenTitle } from '../helper/getSchadenTitle';
import { CommandOutput } from '../interfaces/command.interface';
import { getError } from '../utils/getError';
import { toInteger } from '../utils/toInteger';

const MAX_DICE = 5;
const MAX_N = 10;
const MAX_MOD = 20;
const ALLOWED_M = [2, 3, 4, 6, 8, 10, 12, 20];

export function schaden(type = '', modificator = '0', comment = ''): CommandOutput {
  const mod = toInteger(modificator);
  const dice = type
    .toLowerCase()
    .split(',')
    .map(die => die.split('w').map(x => +x));

  const error = getError([
    {
      condition: dice.length > MAX_DICE,
      reply: `mehr als ${MAX_DICE} verschiedene Würfel werfe ich nicht für dich!`
    },
    {
      condition: dice.some(([n, m]) => isNaN(n) || isNaN(m)),
      reply: 'mit solchen Würfeln kann ich nichts anfangen! Nutze z.B. 1w10 oder 2w8,1w6.'
    },
    {
      condition: dice.some(([n]) => n > MAX_N),
      reply: `mehr als ${MAX_N} Würfel auf einmal werfe ich nicht für dich!`
    },
    {
      condition: dice.some(die => !ALLOWED_M.includes(die[1])),
      reply: `Würfel mit solchen Seitenzahlen funktionieren hier nicht...`
    },
    {
      condition: Math.abs(mod) > MAX_MOD,
      reply: `einen Modifikator von über ${MAX_MOD} halte ich für etwas übertrieben...`
    }
  ]);

  if (error) {
    return error;
  }

  const title = getSchadenTitle(type, mod, comment);
  const results = getSchadenResults(dice);
  const output = getSchadenOutput(results);
  const conclusion = getSchadenConclusion(results, mod);

  return {
    reply: [title, '', ...output, '', conclusion].join('\n')
  };
}

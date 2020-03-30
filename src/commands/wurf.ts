import { CommandOutput } from '../interfaces/command.interface';
import { code } from '../utils/code';
import { getError } from '../utils/getError';
import { getReason } from '../utils/getReason';
import { roll } from '../utils/roll';
import { signNumber } from '../utils/signNumber';
import { sumNumbers } from '../utils/sumNumbers';
import { toInteger } from '../utils/toInteger';

const MAX_N = 10;
const MAX_MOD = 100;
const ALLOWED_M = [2, 3, 4, 6, 8, 10, 12, 20, 100];

export function wurf(type = '', modificator = '0', comment = ''): CommandOutput {
  const mod = toInteger(modificator);
  const [n, m] = type
    .toLowerCase()
    .split('w')
    .map(x => +x);

  const error = getError([
    {
      condition: isNaN(n) || isNaN(m),
      reply: 'mit solchen Würfeln kann ich nichts anfangen! Nutze z.B. 1w10 oder 2w8.'
    },
    {
      condition: n > MAX_N,
      reply: `mehr als ${MAX_N} Würfel auf einmal werfe ich nicht für dich!`
    },
    {
      condition: !ALLOWED_M.includes(m),
      reply: `ein ${m}-seitiger Würfel? Sowas gibt es nicht...`
    },
    {
      condition: Math.abs(mod) > MAX_MOD,
      reply: `einen Modifikator von über ${MAX_MOD} halte ich für etwas übertrieben...`
    }
  ]);

  if (error) {
    return error;
  }

  const rolls = roll(n, m);
  const sum = sumNumbers(rolls, mod);
  const modi = signNumber(mod);
  const results = code(rolls.join(','));
  const reason = getReason(comment);
  const total = code(sum.toString());

  return {
    reply: [
      `dein Würfelergebnis${reason} mit __${n}w${m} ${modi}__`,
      `ist ${results} 🎲 und in Summe ${total}.`
    ].join(' ')
  };
}

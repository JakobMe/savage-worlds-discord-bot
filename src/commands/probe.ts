import { getProbeConclusion } from '../helper/getProbeConclusion';
import { getProbeEvaluation } from '../helper/getProbeEvaluation';
import { getProbeOutput } from '../helper/getProbeOutput';
import { getProbeResults } from '../helper/getProbeResults';
import { getProbeTitle } from '../helper/getProbeTitle';
import { CommandOutput } from '../interfaces/command.interface';
import { getError } from '../utils/getError';
import { toInteger } from '../utils/toInteger';

const GOAL_MIN = 0;
const GOAL_MAX = 20;
const MAX_N = 10;
const MAX_MOD = 20;
const ALLOWED_M = [4, 6, 8, 10, 12];
const ALLOWED_WILD = ['ja', 'nein'];

export function probe(
  type = '',
  modificator = '0',
  goal = '4',
  wild = 'ja',
  comment = ''
): CommandOutput {
  const mod = toInteger(modificator);
  const target = toInteger(goal, 4);
  const wildcard = wild === 'ja';
  const [n, m] = type
    .toLowerCase()
    .split('w')
    .map(x => +x);

  const error = getError([
    {
      condition: isNaN(n) || isNaN(m),
      reply: 'mit solchen Würfeln kann ich nichts anfangen! Nutze z.B. 1w10 oder 2w6.'
    },
    {
      condition: n > MAX_N,
      reply: `mehr als ${MAX_N} Würfel auf einmal werfe ich nicht für dich!`
    },
    {
      condition: !ALLOWED_M.includes(m),
      reply: `ein ${m}-seitiger Würfel ist hier nicht möglich...`
    },
    {
      condition: Math.abs(mod) > MAX_MOD,
      reply: `einen Modifikator von über ${MAX_MOD} halte ich für etwas übertrieben...`
    },
    {
      condition: target < GOAL_MIN || target > GOAL_MAX,
      reply: `der Zielwert muss zwischen ${GOAL_MIN} und ${GOAL_MAX} liegen.`
    },
    {
      condition: !ALLOWED_WILD.includes(wild),
      reply: `Wildcard muss "ja" oder "nein" sein.`
    }
  ]);

  if (error) {
    return error;
  }

  const title = getProbeTitle(n, m, mod, target, comment);
  const results = getProbeResults(n, m, mod, target, wildcard);
  const evaluation = getProbeEvaluation(results);
  const output = getProbeOutput(results, evaluation.discarded);
  const conclusion = getProbeConclusion(evaluation);

  return {
    reply: [title, '', ...output, ...conclusion].join('\n')
  };
}

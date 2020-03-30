import { CommandOutput } from '../interfaces/command.interface';
import { Probe, ProbeEvaluation } from '../interfaces/probe.interface';
import { code } from '../utils/code';
import { evaluateResults } from '../utils/evaluateResults';
import { explodeRoll } from '../utils/explodeRoll';
import { getError } from '../utils/getError';
import { getMax } from '../utils/getMax';
import { getRaises } from '../utils/getRaises';
import { getRaiseEmoji } from '../utils/getRaiseEmoji';
import { getReason } from '../utils/getReason';
import { padNumber } from '../utils/padNumber';
import { roll } from '../utils/roll';
import { signNumber } from '../utils/signNumber';
import { sumNumbers } from '../utils/sumNumbers';
import { toInteger } from '../utils/toInteger';

const GOAL_MIN = 0;
const GOAL_MAX = 20;
const WILDCARD = 6;
const MAX_N = 10;
const MAX_MOD = 20;
const ALLOWED_M = [4, 6, 8, 10, 12];
const ALLOWED_WILD = ['ja', 'nein'];

function getResult(
  index: number,
  die: number,
  mod: number,
  target: number,
  wildcard: boolean
): Probe {
  const initial = roll(1, die)[0];
  const rolls = explodeRoll(initial, die);
  const slipped = initial === 1;
  const exploded = rolls.length > 1;
  const sum = sumNumbers(rolls, mod);
  const success = sum >= target;
  const raises = getRaises(sum, target);
  return { index, die, wildcard, target, mod, rolls, success, slipped, exploded, raises, sum };
}

function getOutcome(result: Probe, max: number, discarded = false): string {
  const raises = getRaiseEmoji(result);
  const sum = code(padNumber(result.sum, max, 'Σ'));
  const status = result.success ? ':white_check_mark:' : ':x:';
  const title = discarded ? '~~Aussortiert~~' : result.success ? 'Erfolg' : 'Fehlschlag';
  return `${sum} — ${status} ${raises} ${title}`;
}

function getOutput(result: Probe, size: number, max: number, discarded = false): string {
  const n = code(padNumber(result.index, size));
  const outcome = getOutcome(result, max, discarded);
  const rolls = code(result.rolls.join(','));
  const dice = `1w${result.die}`;
  return `${n}. ${outcome} mit ${rolls} auf __${dice}__`;
}

function getConclusion(evaluation: ProbeEvaluation): string[] {
  if (evaluation.slipped) {
    return ['', 'Du hast einen **kritischen Fehlschlag** :face_with_symbols_over_mouth:'];
  } else {
    return [];
  }
}

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

  const dice = new Array<number>(n).fill(m);
  const seed = wildcard ? [WILDCARD, ...dice] : dice;
  const results: Probe[] = seed.map((die, i) =>
    getResult(i + 1, die, mod, target, wildcard && i === 0)
  );

  const size = results.length;
  const reason = getReason(comment);
  const bonus = signNumber(mod);
  const [max] = getMax(results.map(r => r.sum));
  const evaluation = evaluateResults(results);
  const { discarded } = evaluation;
  const conclusion = getConclusion(evaluation);
  const output = results.map(r => getOutput(r, size, max, r.index === discarded.index));

  const title = [
    `hier sind die Ergebnisse deiner Probe${reason} mit`,
    `__${n}w${m} ${bonus}__ auf den __Zielwert ${target}__.`
  ];

  return {
    reply: [title.join(' '), '', ...output, ...conclusion].join('\n')
  };
}

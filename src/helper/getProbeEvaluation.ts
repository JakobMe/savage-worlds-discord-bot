import { Probe, ProbeEvaluation } from '../interfaces/probe.interface';

function hasSlipped(results: Probe[]): boolean {
  const size = results.length;
  const half = Math.floor(size / 2);
  const count = results.filter(r => r.slipped).length;
  return count > half;
}

function isWorse(a: Probe, b: Probe): boolean {
  return a.sum === b.sum ? a.die < b.die : a.sum < b.sum;
}

function getDiscarded(results: Probe[]): [Probe, Probe[]] {
  const discarded = results.reduce(
    (discard, result) => (isWorse(result, discard) ? result : discard),
    results[0]
  );

  return results.some(r => r.wildcard)
    ? [discarded, results.filter(r => r.index !== discarded.index)]
    : [null, results];
}

export function getProbeEvaluation(results: Probe[]): ProbeEvaluation {
  const slipped = hasSlipped(results);
  const [discarded, selected] = getDiscarded(results);
  return { slipped, selected, discarded };
}

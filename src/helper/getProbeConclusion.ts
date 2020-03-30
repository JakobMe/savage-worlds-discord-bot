import { ProbeEvaluation } from '../interfaces/probe.interface';

export function getProbeConclusion(evaluation: ProbeEvaluation): string[] {
  if (evaluation.slipped) {
    return ['', 'Du hast einen **kritischen Fehlschlag** :face_with_symbols_over_mouth:'];
  } else {
    return [];
  }
}

export interface Probe {
  index: number;
  die: number;
  wildcard: boolean;
  target: number;
  mod: number;
  rolls: number[];
  success: boolean;
  slipped: boolean;
  exploded: boolean;
  sum: number;
  raises: number;
}

export interface ProbeEvaluation {
  slipped: boolean;
  selected: Probe[];
  discarded: Probe;
}

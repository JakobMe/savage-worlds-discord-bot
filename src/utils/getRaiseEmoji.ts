import { Probe } from '../interfaces/probe.interface';

const EMOJIS = {
  0: ':zero:',
  1: ':one:',
  2: ':two:',
  3: ':three:',
  4: ':four:',
  5: ':five:',
  6: ':six:',
  7: ':seven:',
  8: ':eight:',
  9: ':nine:',
  10: ':keycap_ten:'
};

export function getRaiseEmoji({ raises, success }: Probe): string {
  return raises === 0 && !success ? ':regional_indicator_n:' : EMOJIS[raises] ?? ':arrow_up:';
}

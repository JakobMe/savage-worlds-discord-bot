import { mockRandomForEach } from '../mocks/random.mock';
import { Initiative } from '../../src/classes/initiative.class';

describe('Initiative', () => {
  mockRandomForEach(0);

  it('should be valid with correct input', () => {
    const { result, props } = new Initiative(['a'], '1');

    expect(result).toEqual({
      players: 1,
      enemies: 1,
      items: [
        {
          name: 'a',
          player: true,
          emoji: ':angry:',
          label: 'Karo 2',
          value: 2,
          icon: ''
        },
        {
          name: 'Gegner 1',
          player: false,
          emoji: ':rage:',
          label: 'Kreuz 2',
          value: 1,
          icon: ''
        }
      ]
    });

    expect(props).toEqual({
      users: ['a'],
      enemies: 1,
      valid: true,
      allowed: true
    });
  });

  it('should be invalid with incorrect input', () => {
    const { result, props } = new Initiative([], '');

    expect(result).toEqual({
      players: 0,
      enemies: 0,
      items: []
    });

    expect(props).toEqual({
      users: [],
      enemies: 0,
      valid: false,
      allowed: true
    });
  });

  it('should be disallowed with out-of-bounds values', () => {
    const { result, props } = new Initiative([], '50');

    expect(result).toEqual({
      players: 0,
      enemies: 0,
      items: []
    });

    expect(props).toEqual({
      users: [],
      enemies: 50,
      valid: true,
      allowed: false
    });
  });
});

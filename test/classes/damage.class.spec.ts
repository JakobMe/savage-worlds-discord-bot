import { mockRandomForEach, mockRandom } from '../mocks/random.mock';
import { Damage } from '../../src/classes/damage.class';

describe('Damage', () => {
  mockRandomForEach(0.5);

  it('should be valid with correct input', () => {
    const { result, props } = new Damage('1w6');

    expect(result).toEqual({
      sum: 4,
      rolls: [4],
      emoji: ':punch:',
      items: [
        {
          die: 6,
          rolls: [4],
          explode: false,
          emoji: ':drop_of_blood:',
          sum: 4
        }
      ]
    });

    expect(props).toEqual({
      dice: [[1, 6]],
      sequence: [6],
      mod: 0,
      explode: true,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '1w6'
    });
  });

  it('should be valid with correct extended input', () => {
    const { result, props } = new Damage('2w6,8', '4');

    expect(result).toEqual({
      sum: 17,
      rolls: [4, 4, 5],
      emoji: ':axe:',
      items: [
        {
          die: 6,
          rolls: [4],
          explode: false,
          emoji: ':drop_of_blood:',
          sum: 4
        },
        {
          die: 6,
          rolls: [4],
          explode: false,
          emoji: ':drop_of_blood:',
          sum: 4
        },
        {
          die: 8,
          rolls: [5],
          explode: false,
          emoji: ':drop_of_blood:',
          sum: 5
        }
      ]
    });

    expect(props).toEqual({
      dice: [
        [2, 6],
        [1, 8]
      ],
      sequence: [6, 6, 8],
      mod: 4,
      explode: true,
      valid: true,
      allowed: true,
      modificator: '+4',
      expression: '2w6 und 1w8'
    });
  });

  it('should be valid with correct input and explode', () => {
    mockRandom([0.99, 0.99, 0.5]);

    const { result, props } = new Damage('6');

    expect(result).toEqual({
      sum: 16,
      rolls: [6, 6, 4],
      emoji: ':axe:',
      items: [
        {
          die: 6,
          rolls: [6, 6, 4],
          explode: true,
          emoji: ':boom:',
          sum: 16
        }
      ]
    });

    expect(props).toEqual({
      dice: [[1, 6]],
      sequence: [6],
      mod: 0,
      explode: true,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '1w6'
    });
  });
});

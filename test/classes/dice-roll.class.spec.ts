import { mockRandomForEach, mockRandom } from '../mocks/random.mock';
import { DiceRoll } from '../../src/classes/dice-roll.class';

describe('DiceRoll', () => {
  mockRandomForEach(0.5);

  it('should be valid with correct input', () => {
    const { result, props } = new DiceRoll('1w6');

    expect(result).toEqual({
      sum: 4,
      rolls: [4],
      items: [
        {
          die: 6,
          rolls: [4],
          explode: false,
          sum: 4
        }
      ]
    });

    expect(props).toEqual({
      dice: [[1, 6]],
      sequence: [6],
      mod: 0,
      explode: false,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '1w6'
    });
  });

  it('should be valid with correct extended input', () => {
    const { result, props } = new DiceRoll('2w6,8', '6');

    expect(result).toEqual({
      sum: 19,
      rolls: [4, 4, 5],
      items: [
        {
          die: 6,
          rolls: [4],
          explode: false,
          sum: 4
        },
        {
          die: 6,
          rolls: [4],
          explode: false,
          sum: 4
        },
        {
          die: 8,
          rolls: [5],
          explode: false,
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
      mod: 6,
      explode: false,
      valid: true,
      allowed: true,
      modificator: '+6',
      expression: '2w6 und 1w8'
    });
  });

  it('should be valid with correct input and explode', () => {
    mockRandom([0.99, 0.99, 0.5, 0.99, 0.5, 0.5]);

    const { result, props } = new DiceRoll('1w6,4,w3', '', true);

    expect(result).toEqual({
      sum: 25,
      rolls: [6, 6, 4, 4, 3, 2],
      items: [
        {
          die: 6,
          rolls: [6, 6, 4],
          explode: true,
          sum: 16
        },
        {
          die: 4,
          rolls: [4, 3],
          explode: true,
          sum: 7
        },
        {
          die: 3,
          rolls: [2],
          explode: false,
          sum: 2
        }
      ]
    });

    expect(props).toEqual({
      dice: [
        [1, 6],
        [1, 4],
        [1, 3]
      ],
      sequence: [6, 4, 3],
      mod: 0,
      explode: true,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '1w6, 1w4 und 1w3'
    });
  });

  it('should be valid with negative sum capped at 0', () => {
    const { result, props } = new DiceRoll('2w2', '-10');

    expect(result).toEqual({
      sum: 0,
      rolls: [2, 2],
      items: expect.any(Array)
    });

    expect(props).toEqual({
      dice: [[2, 2]],
      sequence: [2, 2],
      mod: -10,
      explode: false,
      valid: true,
      allowed: true,
      modificator: '-10',
      expression: '2w2'
    });
  });

  it('should be invalid with empty input', () => {
    const { result, props } = new DiceRoll(null, '2');

    expect(result).toEqual({
      sum: 0,
      rolls: [],
      items: []
    });

    expect(props).toEqual({
      dice: [[1, 0]],
      sequence: [0],
      mod: 2,
      explode: false,
      valid: false,
      allowed: true,
      modificator: '+2',
      expression: ''
    });
  });

  it('should be invalid with malformed input', () => {
    const { result, props } = new DiceRoll('2wM', 'd');

    expect(result).toEqual({
      sum: 0,
      rolls: [],
      items: []
    });

    expect(props).toEqual({
      dice: [[1, 0]],
      sequence: [0],
      mod: 0,
      explode: false,
      valid: false,
      allowed: true,
      modificator: '±0',
      expression: ''
    });
  });

  it('should be invalid with excluded m', () => {
    const { result, props } = new DiceRoll('3w5');

    expect(result).toEqual({
      sum: 0,
      rolls: [],
      items: []
    });

    expect(props).toEqual({
      dice: [[3, 5]],
      sequence: [5, 5, 5],
      mod: 0,
      explode: false,
      valid: false,
      allowed: true,
      modificator: '±0',
      expression: '3w5'
    });
  });

  it('should be disallowed with out-of-bounds n', () => {
    const { result, props } = new DiceRoll('100w4');

    expect(result).toEqual({
      sum: 0,
      rolls: [],
      items: []
    });

    expect(props).toEqual({
      dice: [[100, 4]],
      sequence: expect.arrayContaining([4]),
      mod: 0,
      explode: false,
      valid: true,
      allowed: false,
      modificator: '±0',
      expression: '100w4'
    });
  });

  it('should be disallowed with out-of-bounds mod', () => {
    const { result, props } = new DiceRoll('6w8', '-200');

    expect(result).toEqual({
      sum: 0,
      rolls: [],
      items: []
    });

    expect(props).toEqual({
      dice: [[6, 8]],
      sequence: expect.arrayContaining([8]),
      mod: -200,
      explode: false,
      valid: true,
      allowed: false,
      modificator: '-200',
      expression: '6w8'
    });
  });
});

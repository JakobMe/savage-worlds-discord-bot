import { mockRandomForEach, mockRandom } from '../mocks/random.mock';
import { Check } from '../../src/classes/check.class';

describe('Check', () => {
  mockRandomForEach(0.5);

  it('should be valid with correct input', () => {
    const { result, props } = new Check('1w8');

    expect(result).toEqual({
      expression: '1w6 und 1w8',
      fumble: false,
      successes: 1,
      emoji: ':white_check_mark:',
      items: [
        {
          die: 6,
          success: true,
          fumble: false,
          explode: false,
          discard: true,
          outcome: expect.stringMatching('Aussortiert'),
          sum: 4,
          raises: 0,
          rolls: [4],
          emoji: ':zero:'
        },
        {
          die: 8,
          success: true,
          fumble: false,
          explode: false,
          discard: false,
          outcome: expect.stringMatching('Erfolg'),
          sum: 5,
          raises: 0,
          rolls: [5],
          emoji: ':zero:'
        }
      ]
    });

    expect(props).toEqual({
      n: 1,
      m: 8,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: true,
      valid: true,
      allowed: true
    });
  });

  it('should be valid with correct extended input', () => {
    const { result, props } = new Check('2w10', '2', '2', 'nein');

    expect(result).toEqual({
      expression: '2w10',
      fumble: false,
      successes: 2,
      emoji: ':white_check_mark:',
      items: [
        {
          die: 10,
          success: true,
          fumble: false,
          explode: false,
          discard: false,
          outcome: expect.stringMatching('Erfolg'),
          sum: 8,
          raises: 1,
          rolls: [6],
          emoji: ':one:'
        },
        {
          die: 10,
          success: true,
          fumble: false,
          explode: false,
          discard: false,
          outcome: expect.stringMatching('Erfolg'),
          sum: 8,
          raises: 1,
          rolls: [6],
          emoji: ':one:'
        }
      ]
    });

    expect(props).toEqual({
      n: 2,
      m: 10,
      mod: 2,
      modificator: '+2',
      goal: 2,
      wildcard: false,
      valid: true,
      allowed: true
    });
  });

  it('should be valid with correct input and explode', () => {
    mockRandom([0.99, 0.99, 0.5]);

    const { result, props } = new Check('6', '', '', 'nein');

    expect(result).toEqual({
      expression: '1w6',
      fumble: false,
      successes: 1,
      emoji: ':white_check_mark:',
      items: [
        {
          die: 6,
          success: true,
          fumble: false,
          explode: true,
          discard: false,
          outcome: expect.stringMatching('boom'),
          sum: 16,
          raises: 3,
          rolls: [6, 6, 4],
          emoji: ':three:'
        }
      ]
    });

    expect(props).toEqual({
      n: 1,
      m: 6,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: false,
      valid: true,
      allowed: true
    });
  });

  it('should be valid with correct input and fumble', () => {
    mockRandom(0);

    const { result, props } = new Check('w6');

    expect(result).toEqual({
      expression: '1w6 und 1w6',
      fumble: true,
      successes: 0,
      emoji: ':x:',
      items: [
        {
          die: 6,
          success: false,
          fumble: true,
          explode: false,
          discard: true,
          outcome: expect.stringMatching('Aussortiert'),
          sum: 1,
          raises: 0,
          rolls: [1],
          emoji: ':x:'
        },
        {
          die: 6,
          success: false,
          fumble: true,
          explode: false,
          discard: false,
          outcome: expect.stringMatching('Fehlschlag'),
          sum: 1,
          raises: 0,
          rolls: [1],
          emoji: ':x:'
        }
      ]
    });

    expect(props).toEqual({
      n: 1,
      m: 6,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: true,
      valid: true,
      allowed: true
    });
  });

  it('should be invalid with incorrect input', () => {
    const { result, props } = new Check('abc');

    expect(result).toEqual({
      expression: '',
      fumble: false,
      successes: 0,
      emoji: '',
      items: []
    });

    expect(props).toEqual({
      n: 1,
      m: 0,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: true,
      valid: false,
      allowed: true
    });
  });

  it('should be invalid with excluded dice', () => {
    const { result, props } = new Check('1w9');

    expect(result).toEqual({
      expression: '',
      fumble: false,
      successes: 0,
      emoji: '',
      items: []
    });

    expect(props).toEqual({
      n: 1,
      m: 9,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: true,
      valid: false,
      allowed: true
    });
  });

  it('should be disallowed with out-of-bounds values', () => {
    const { result, props } = new Check('21w6', '21', '30');

    expect(result).toEqual({
      expression: '',
      fumble: false,
      successes: 0,
      emoji: '',
      items: []
    });

    expect(props).toEqual({
      n: 21,
      m: 6,
      mod: 21,
      modificator: '+21',
      goal: 30,
      wildcard: true,
      valid: true,
      allowed: false
    });
  });

  it('should be disallowed with invalid wild', () => {
    const { result, props } = new Check('6', '', '', 'abc');

    expect(result).toEqual({
      expression: '',
      fumble: false,
      successes: 0,
      emoji: '',
      items: []
    });

    expect(props).toEqual({
      n: 1,
      m: 6,
      mod: 0,
      modificator: '±0',
      goal: 4,
      wildcard: null,
      valid: true,
      allowed: false
    });
  });
});

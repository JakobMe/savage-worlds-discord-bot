import { Templates } from '../../src/classes/templates.class';

describe('Templates', () => {
  const templates = new Templates();

  it('should create correct output without data', () => {
    const output = templates.render('wurf/invalid');
    expect(output).toBe('mit solchen Würfeln kann ich nichts anfangen :robot: —');
  });

  it('should create correct output with valid data', () => {
    const output = templates.render('ini/disallowed', { players: 2, enemies: 1 });
    expect(output).toBe('es dürfen maximal 2 Spieler und 1 Gegner angegeben werden :robot:');
  });

  it('should create correct output with invalid data', () => {
    const output = templates.render('ini/disallowed', { enemies: 1 });
    expect(output).toBe('es dürfen maximal  Spieler und 1 Gegner angegeben werden :robot:');
  });

  it('should concatenate multiple templates', () => {
    const output = templates.render(['wurf/invalid', 'probe/invalid']);
    expect(output).toBe(
      'mit solchen Würfeln kann ich nichts anfangen :robot: — mit solchen Würfeln kann ich nichts anfangen :robot: —'
    );
  });
});

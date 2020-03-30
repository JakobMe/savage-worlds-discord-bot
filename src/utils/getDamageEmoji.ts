export function getDamageEmoji(damage: number): string {
  if (damage >= 24) {
    return ':skull:';
  } else if (damage >= 20) {
    return ':fire:';
  } else if (damage >= 16) {
    return ':axe:';
  } else if (damage >= 12) {
    return ':crossed_swords:';
  } else if (damage >= 8) {
    return ':dagger:';
  } else if (damage >= 6) {
    return ':boxing_glove:';
  } else if (damage >= 4) {
    return ':punch:';
  } else if (damage >= 2) {
    return ':cat:';
  } else {
    return ':poop:';
  }
}

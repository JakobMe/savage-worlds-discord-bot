import { Message } from 'discord.js';
import { isAdmin } from '../utils/isAdmin';
import { toInteger } from '../utils/toInteger';
import { clamp } from '../utils/clamp';

const AMOUNT_MIN = 1;
const AMOUNT_MAX = 100;
const AMOUNT_DEFAULT = 99;

export async function clear(message: Message, amount?: string): Promise<void> {
  const input = toInteger(amount, AMOUNT_DEFAULT) + 1;
  const amountToDelete = clamp(input, AMOUNT_MIN, AMOUNT_MAX);
  const admin = isAdmin(message.member);

  if (!admin) {
    return;
  }

  message.channel.bulkDelete(amountToDelete, true).catch(() => {
    message.reply(`beim Löschen der Nachrichten ist ein Fehler aufgetreten!`);
  });
}

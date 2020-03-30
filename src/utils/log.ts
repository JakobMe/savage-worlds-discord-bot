import { ClientUser, User } from 'discord.js';
import { getTimestamp } from './getTimestamp';

export function log(user: ClientUser | User, message: string): void {
  const timestamp = getTimestamp();
  console.log(`[${timestamp}]\t${user.tag}\t > ${message}`);
}

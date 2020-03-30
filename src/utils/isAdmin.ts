import { GuildMember } from 'discord.js';

export function isAdmin(member: GuildMember): boolean {
  return member.hasPermission('ADMINISTRATOR');
}

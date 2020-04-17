import { Client } from 'discord.js';
import { discordConfig } from './config/discord.config';
import { Program } from './classes/program.class';

const bot = new Client();
const token = discordConfig.token;
new Program(bot, token).start();

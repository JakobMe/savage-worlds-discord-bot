import { Client } from 'discord.js';
import { config } from 'dotenv';
import { Program } from './classes/program.class';

config();
const bot = new Client();
new Program(bot, process.env.DISCORD_TOKEN).start();

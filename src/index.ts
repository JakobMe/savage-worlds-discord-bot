import { Client } from 'discord.js';
import { config } from 'dotenv';
import express from 'express';
import { Program } from './classes/program.class';
import { Server } from './classes/server.class';

config();
const bot = new Client();

new Program(bot, process.env.DISCORD_TOKEN).start();
new Server(express(), process.env.PORT ?? '3000').start();

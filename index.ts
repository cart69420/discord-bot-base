require('dotenv').config();

import { Client, Collection } from "discord.js";
import { Command, CommandInfo } from "./commands/Command";
import CommandManager from "./commands/CommandManager";
import Event from "./events/Event";
import EventManager from "./events/EventManager";

export const client: Client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
export const prefix: string = process.env.PREFIX || "c!";
export let Caches: { 
    commands: Collection<CommandInfo, Command>, 
    events: Collection<string, Event> 
} = { commands : new Collection(), events: new Collection() };


CommandManager.init();
EventManager.init();

client.login(process.env.TOKEN);
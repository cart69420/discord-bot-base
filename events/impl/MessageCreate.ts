import { Client, Interaction, Message } from "discord.js";
import { Caches, prefix } from "../..";
import { Command, CommandArgs } from "../../commands/Command";
import Event from "../Event";

export default class MessageCreate extends Event {
    constructor() {
        super("messageCreate");
    }

    async execute(client: Client, message: Message) {
        if (!message.content.startsWith(prefix) || message.author == client.user || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = Caches.commands.find(cmd => cmd._info.name === commandName || (cmd._info.aliases && cmd._info.aliases.includes(commandName)));
        if (!command) return;

        try {
            if (command._info.permission.validate(message.member!))
                command.execute(new CommandArgs(message, args, client));
        } catch (error) {
            console.error(error);
        }
    }
}
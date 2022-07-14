import { Client, Collection, Interaction, Message } from "discord.js";
import { Caches, prefix } from "../..";
import { Command, CommandArgs, Cooldown } from "../../commands/Command";
import Event from "../Event";

export default class MessageCreate extends Event {
    constructor() {
        super("messageCreate");
    }

    async execute(client: Client, message: Message) {
        Caches.cooldown = Caches.cooldown.filter(cd => !cd.passed());
        if (!message.content.startsWith(prefix) || message.author == client.user || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = Caches.commands.find(cmd => cmd._info.name === commandName || (cmd._info.aliases && cmd._info.aliases.includes(commandName)));
        if (!command) return;

        try {
            const f = (c: Cooldown) => c._user.id == message.author.id && c._command._info.name == command._info.name
            if (!Caches.cooldown.find(f) && command._info.permission.validate(message.member!) && message.guild?.members.cache.get(client.user!.id)?.permissionsIn(message.channel.id).has("SEND_MESSAGES")) {
                command.execute(new CommandArgs(message, args, client));
                Caches.cooldown.push(new Cooldown(message.author, command));
            } else {
                message.reply(`**You are on cooldown!** Please wait \`${Caches.cooldown.find(f)?.left()}ms\` and try again.`).then(m => setTimeout(() => m.delete(), 2000));
            }
        } catch (error) {
            console.error(error);
        }
    }
}
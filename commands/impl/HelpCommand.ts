import { MessageEmbed } from "discord.js";
import { Caches } from "../..";
import Permissions from "../../api/Permissions";
import { Command, CommandArgs, CommandInfo } from "../Command";

export default class HelpCommand extends Command {
    constructor() {
        super(new CommandInfo("help", "Shows commands", ["cmds", "commands"], Permissions.DEFAULT));
    }

    execute(cargs: CommandArgs): void {
        let m: string = 
        `
${Caches.commands.filter(c => c._info.permission == Permissions.DEFAULT).map(c => `\`${c._info.name}\` ${c._info.description}`).join("\n")}

*ADMIN/WHITELISTED ONLY*
${Caches.commands.filter(c => c._info.permission != Permissions.DEFAULT).map(c => `\`${c._info.name}\` ${c._info.description}`).join("\n")}
        `

        cargs.message.reply(m);
    }
}
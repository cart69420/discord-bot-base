import { readdirSync } from 'fs';
import { Caches } from '../..';
import Permission from "../../api/Permissions";
import { Command, CommandArgs, CommandInfo } from "../Command";
import CommandManager from '../CommandManager';

export default class ReloadCommand extends Command {
    constructor() {
        super(new CommandInfo("reload", "Reloads a command", ["rl"], Permission.WHITELIST));
    }

    execute(cargs: CommandArgs): void {
        Caches.commands.clear();
        let cmds = readdirSync(__dirname).filter(f => f.endsWith(__filename.split(".")[1]));
        cmds.forEach(c => {
            delete require.cache[require.resolve(`${__dirname}\\${c}`)];
        });
        CommandManager.init();
        cargs.message.reply("Reloaded all commands!");
    }
}
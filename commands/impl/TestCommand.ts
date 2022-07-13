import { Command, CommandArgs, CommandInfo } from "../Command";
import Permissions from "../../api/Permissions";

export default class TestCommand extends Command {
    constructor() {
        super(new CommandInfo("test", "Test command", ["test"], Permissions.DEFAULT));
    }

    execute(cargs: CommandArgs): void {
        cargs.message.reply("Test command executed!");
    }
}
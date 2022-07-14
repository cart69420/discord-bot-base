import Permissions from "../../api/Permissions";
import { Command, CommandArgs, CommandInfo } from "../Command";

export default class EvalCommand extends Command {
    constructor() {
        super(new CommandInfo("eval", "Evaluates code", ["ev"], Permissions.WHITELIST));
    }

    execute(cargs: CommandArgs): void {
        eval(cargs.args.join(" "));
    }
}
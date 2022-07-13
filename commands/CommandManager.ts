import { Command } from "./Command";
import { readdirSync } from "fs";

export default class CommandManager {
    static init() {
        const cmds = readdirSync("./commands/impl").filter(file => file.endsWith(".ts"));
        cmds.forEach(file => {
            import(`../commands/impl/${file}`).then(module => {
                if (Object.keys(module).includes("default")) {
                    const command: Command = new module.default()
                    command.register();
                    console.log(`Registered command: ${command._info.name}`);
                } else {
                    console.log(`Command file \"${file}\" is missing a default export. So it will not be registered.`);
                }
            });
        }, (err: any) => console.log(err));
        console.log("Loaded all commands!");
    }
}
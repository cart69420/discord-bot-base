import { readdirSync } from "fs";
import Event from "./Event";

export default class EventManager {
    static init() {
        const ev = readdirSync(`${__dirname}\\impl`).filter(file => file.endsWith(__filename.split(".")[1]));
        ev.forEach(file => {
            import(`${__dirname}\\impl\\${file}`).then(module => {
                if (Object.keys(module).includes("default")) {
                    const event: Event = new module.default()
                    event.register();
                    console.log(`Registered event: ${event._name}`);
                } else {
                    console.log(`Event file \"${file}\" is missing a default export. So it will not be registered.`);
                }
            });
        }, (err: any) => console.log(err));
        console.log("Loaded all events!");
    }
}
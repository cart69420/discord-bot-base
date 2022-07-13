import { Client } from "discord.js";
import Event from "../Event";

export default class ReadyEvent extends Event {
    constructor() {
        super("ready");
    }
    execute(client: Client) {
        console.log("Logged in as " + client.user?.tag);
    }
}
import { Client } from "discord.js";
import { Caches, client } from "..";

export default abstract class Event {
    public _name: string;
    constructor(name: string) {
        this._name = name;
    }

    abstract execute(client: Client, ...args: any[]): void;

    register(): void {
        client.on(this._name, (...args: any[]) => this.execute(client, ...args));
        Caches.events.set(this._name, this);
    }
}
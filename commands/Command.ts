import { Client, Message, User } from "discord.js";
import { Caches } from "..";
import { PermissionType } from "../api/Permissions";


export abstract class Command {
    public _info: CommandInfo;

    constructor(info: CommandInfo) {
        this._info = info;
    }

    abstract execute(cargs: CommandArgs): void;

    register(): void {
        Caches.commands.set(this._info, this);
    }
}

export class CommandInfo {
    private _name: string;
    private _description: string;
    private _aliases: string[];
    private _permission: PermissionType;
    private _cooldown: number = 0;

    constructor(name: string, description: string, aliases: string[], permission: PermissionType, cooldown: number = 0) {
        this._name = name;
        this._description = description;
        this._aliases = aliases;
        this._permission = permission;
        this._cooldown = cooldown;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get aliases(): string[] {
        return this._aliases;
    }

    get permission(): PermissionType {
        return this._permission;
    }

    get cooldown(): number {
        return this._cooldown;
    }
}

export class CommandArgs {
    private _args: string[];
    private _message: Message;
    private _client: Client;

    constructor(message: Message, args: string[], client: Client) {
        this._args = args;
        this._message = message;
        this._client = client;
    }

    get args(): string[] {
        return this._args;
    }

    get message(): Message {
        return this._message;
    }

    get client(): Client {
        return this._client;
    }
}

export class Cooldown {
    public _user: User;
    public _command: Command;
    private time: number;
    constructor(user: User, command: Command) {
        this._user = user;
        this._command = command;
        this.time = Date.now();
    }

    passed(): boolean {
        return Date.now() - this.time >= this._command._info.cooldown;
    }

    left(): number {
        return this._command._info.cooldown - (Date.now() - this.time);
    }

    toString(): string {
        return `${this._user.id}|${this._command._info.name}|${this._command._info.cooldown}`;
    }
}
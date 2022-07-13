import { GuildMember, PermissionString, Snowflake } from "discord.js";

export class PermissionType {
    public _name: string;
    private _callback: (member: GuildMember) => boolean;
    constructor(name: string, callback: (member: GuildMember) => boolean) {
        this._name = name;
        this._callback = callback;
    }

    validate(member: GuildMember): boolean {
        return this._callback(member);
    }
}

export default class Permissions {
    public static hasPermission(member: GuildMember, permission: PermissionString): boolean {
        return member.permissions.has(permission);
    }

    public static hasRole(member: GuildMember, role: string): boolean {
        return member.roles.cache.find(r => r.name === role) !== undefined;
    }

    public static readonly DEFAULT: PermissionType = 
        new PermissionType("DEFAULT", (member: GuildMember) => true);
    public static readonly ADMINISTRATOR: PermissionType = 
        new PermissionType("ADMINISTRATOR", (member: GuildMember) => this.hasPermission(member, "ADMINISTRATOR"));

}
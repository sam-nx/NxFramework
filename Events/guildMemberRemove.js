const { EventHandler, Embed } = require("../Utils/Classes.js");

module.exports = class extends EventHandler {
    constructor(client) {
        super(client);
        this.eventName = "guildMemberRemove";
    }

    async execute(member) {
        console.log("[GuildMemberRemove]".yellow, `${member.user.tag} (${member.id}) has left the server.`);
    }
}
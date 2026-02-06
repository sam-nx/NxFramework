const { EventHandler } = require("../Utils/Classes.js");

module.exports = class extends EventHandler {
    constructor(client) {
        super(client);
        this.eventName = "guildMemberAdd";
    }

    async execute(member) {
        console.log("[GuildMemberAdd]".yellow, `${member.user.tag} (${member.id}) has joined the server.`);
    }
}
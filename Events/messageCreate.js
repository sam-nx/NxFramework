const { EventHandler, Embed } = require("../Utils/Classes.js");

module.exports = class extends EventHandler {
    constructor(client) {
        super(client);
        this.eventName = "messageCreate";
    }

    async execute(message) {
        if (message.author.bot) return;
        console.log("[MessageCreate]".yellow, `${message.author.tag} (${message.id}) in ${message.guild ? message.guild.name : "DMs"}: ${message.content}`);
    }
}
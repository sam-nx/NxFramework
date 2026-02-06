const { EventHandler } = require("../Utils/Classes.js");
const fs = require("fs");

// This is the main ready event that runs when the bot is fully loaded
// Avoid editing this file, instead add new ready events in the Events/ready folder

module.exports = class extends EventHandler {
    constructor(client) {
        super(client);
        this.eventName = "ready";
    }

    async execute(client) {
        await client.presence.set({
            status: "online",
            activities: [
                {
                    name: "Made with NxFramework 🫶",
                    type: 4
                }
            ]
        });

        // DO NOT DELETE THIS - IT LOADS ALL READY EVENTS IN THE Events/ready FOLDER
        // Note that you can replicate this for other events as well

        const readyDir = fs.readdirSync("./Events/ready");

        for (const file of readyDir) {
            const event = require(`./ready/${file}`);
            event(client);
        }
    }
}
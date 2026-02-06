// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

const fs = require("fs");
const path = require("path");
const client = require("./Client.js");
require("colors");

let files = fs.readdirSync(path.join(__dirname, '../Events/'));

console.log("[NxFramework]".blue, "### LOADING EVENTS ###".yellow);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    
    let event = require(`../Events/${file}`);
    event = new event(client);

    client.on(event.eventName, (...args) => event.execute(...args));
    console.log("[NxFramework]".blue, `Event loaded: ${event.eventName}`.cyan);
})
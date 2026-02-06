// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

const generalConfig = require("../Configs/general.json");

process.on("unhandledRejection", (error) => {
    let webhook = generalConfig.errorsWebhook;
    let data = {
        content: "```js\n" + error.stack + "```"
    }
    
    if (error.message.includes("Unknown interaction")) return; // Not quite sure why this error often happens, if you know a solution please open an issue or PR

    require("node-fetch")(webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    console.error(error);
});

process.on("uncaughtException", (error) => {
    let webhook = generalConfig.errorsWebhook;
    let data = {
        content: "```js\n" + error.stack + "```"
    }
    require("node-fetch")(webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    console.error(error);
    process.exit(1);
});
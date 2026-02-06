// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

require("dotenv").config();
require("./Utils/ErrorsHandler.js");
const client = require("./Utils/Client.js");
const genConfig = require("./Configs/general.json");

client.login(genConfig.devmode ? process.env.DISCORD_TOKEN_DEV : process.env.DISCORD_TOKEN_PROD);

require("./Utils/EventsHandler.js");
require("./Utils/InteractionsHandler.js");
require("./Utils/Functions.js")
// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

const mysql = require("mysql2/promise");
const mycnf = require("../Configs/mysql.json");
let connection = mysql.createPool(mycnf);

connection.on("connect", function() {
    console.log("[MySQL]".yellow, "Connected to the database.".green);
});

connection.on("error", function(err) {
    console.log("[MySQL]".yellow, `Error: ${err.code}`.red);
});

module.exports = connection;
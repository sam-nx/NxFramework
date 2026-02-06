// Declare all your useful functions here, so you can use them in other files by requiring this file

const connection = require("./MySQL.js")

const sqlQuery = async (query, values = []) => {
    try {
        const [rows] = await connection.query(query, values);
        return rows;
    } catch (err) {
        console.error("[MySQL] Query error:", err.code, err.message);
        // Optionally notify via webhook or log system here
        throw err;
    }
}

const mySuperUsefulFunction = () => {
    return "This is a super useful function!";
}

module.exports = {
    sqlQuery,
    mySuperUsefulFunction
}
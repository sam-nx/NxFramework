const { ChannelType } = require("discord.js");
const { WebSocketServer } = require("ws");

// This is a simple WebSocket server that listens on port 44003

module.exports = async (client) => {
    console.log("[WebSocket]".yellow, "Initializing WebSocket.".bgCyan);

    const wss = new WebSocketServer({ port: 44003 });

    wss.on("connection", (ws) => {
        ws.on("error", (err) => {
            console.log("[WebSocket]".red, "An error occurred.".bgRed, err);
        });

        ws.on("message", async (message) => {
            const data = Buffer.from(message).toString();
            console.log("[WebSocket]".yellow, "Received message.".bgCyan, data);
            
            const parsedData = JSON.parse(data);
            if (!parsedData.action) return;

            switch(parsedData.action) {
                case "ping": {
                    ws.send(JSON.stringify({ status: 1, data: { message: "pong" } }));
                    break;
                }
            }
        });
    });
}
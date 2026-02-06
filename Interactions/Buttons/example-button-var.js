const { ButtonHandler } = require("../../Utils/Classes.js");
const { MessageFlags } = require("discord.js");

// This is an example of a button interaction with a variable part in the customId
// The variable part is denoted by {%var%} in the customId
// It can be very useful for creating dynamic buttons that can handle different data

module.exports = class extends ButtonHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "button-with-variable-{%var%}"
        ];
    }

    async execute(button) {
        const varPart = button.customId.split("-")[1]; // Extract the variable part from the customId
        if (!varPart) return button.reply({ content: "Error: Variable part not found in customId.", ephemeral: true, flags: MessageFlags.Ephemeral });

        console.log(`[Button with variable]`.yellow, `${button.user.tag} (${button.user.id}) clicked the button with customId: ${button.customId} and variable: ${varPart}`);
    }
}
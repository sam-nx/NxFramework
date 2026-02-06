const { ModalHandler } = require("../../Utils/Classes.js");
const { MessageFlags } = require("discord.js");

// This is an example of a modal interaction with a variable part in the customId
// The variable part is denoted by {%var%} in the customId
// It can be very useful for creating dynamic modals that can handle different data

module.exports = class extends ModalHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "example-modal-{%var%}"
        ];
    }

    async execute(modal) {
        const varPart = modal.customId.split("example-modal-")[1]; // Extract the variable part from the customId
        if (!varPart) return modal.reply({ content: "Error: Variable part not found in customId.", ephemeral: true, flags: MessageFlags.Ephemeral });

        const testInputData = modal.fields.getTextInputValue("test-input");
        if (!testInputData) return modal.reply({ content: "Error: 'test-input' field is missing.", ephemeral: true, flags: MessageFlags.Ephemeral });

        await modal.reply({ content: `Modal submitted successfully with input: ${testInputData} and variable part: ${varPart}`, ephemeral: true, flags: MessageFlags.Ephemeral });
    }
}
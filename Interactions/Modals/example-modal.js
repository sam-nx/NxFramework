const { ModalHandler } = require("../../Utils/Classes.js");
const { MessageFlags } = require("discord.js");

// This is an example of a classic modal interaction

module.exports = class extends ModalHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "example-modal"
        ];
    }

    async execute(modal) {
        const testInputData = modal.fields.getTextInputValue("test-input");
        if (!testInputData) return modal.reply({ content: "Error: 'test-input' field is missing.", ephemeral: true, flags: MessageFlags.Ephemeral });

        await modal.reply({ content: `Modal submitted successfully with input: ${testInputData}`, ephemeral: true, flags: MessageFlags.Ephemeral });
    }
}
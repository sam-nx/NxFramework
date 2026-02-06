const { ButtonHandler } = require("../../Utils/Classes.js");

// This is an example of a classic button interaction

module.exports = class extends ButtonHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "button-without-variable",
        ];
    }

    async execute(button) {
        console.log(`[Button]`.yellow, `${button.user.tag} (${button.user.id}) clicked the button with customId: ${button.customId}`);
    }
}
const { SelectMenuHandler } = require("../../Utils/Classes.js");
const { MessageFlags } = require("discord.js");

// This is an example of a select menu interaction with a variable part in the customId
// The variable part is denoted by {%var%} in the customId
// It can be very useful for creating dynamic select menus that can handle different data

module.exports = class extends SelectMenuHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "example-selectmenu-{%var%}"
        ];
    }

    async execute(selectMenu) {
        const varPart = selectMenu.customId.split("example-selectmenu-")[1];
        if (!varPart) return selectMenu.reply({ content: "Error: Variable part not found in customId.", ephemeral: true, flags: MessageFlags.Ephemeral });

        const selectedValue = selectMenu.values[0];
        if (!selectedValue) return selectMenu.reply({ content: "Error: No value selected.", ephemeral: true, flags: MessageFlags.Ephemeral });

        console.log(`[SelectMenu with variable]`.yellow, `${selectMenu.user.tag} (${selectMenu.user.id}) selected value: ${selectedValue} from select menu with customId: ${selectMenu.customId} and variable: ${varPart}`);

        await selectMenu.reply({ content: `You selected: ${selectedValue} with variable part: ${varPart}`, ephemeral: true, flags: MessageFlags.Ephemeral });
    }
}
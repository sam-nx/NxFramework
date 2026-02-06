const { SelectMenuHandler } = require("../../Utils/Classes.js");
const { MessageFlags } = require("discord.js");

// This is an example of a classic select menu interaction

module.exports = class extends SelectMenuHandler {
    constructor(client) {
        super(client);
        this.customIds = [
            "example-selectmenu"
        ];
    }

    async execute(selectMenu) {
        const selectedValue = selectMenu.values[0];
        if (!selectedValue) return selectMenu.reply({ content: "Error: No value selected.", ephemeral: true, flags: MessageFlags.Ephemeral });

        console.log(`[SelectMenu]`.yellow, `${selectMenu.user.tag} (${selectMenu.user.id}) selected value: ${selectedValue} from select menu with customId: ${selectMenu.customId}`);

        await selectMenu.reply({ content: `You selected: ${selectedValue}`, ephemeral: true, flags: MessageFlags.Ephemeral });
    }
}
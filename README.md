# Nx Discord.js Framework

## About
NxFramework is a Discord.js framework that has been created in order to simplify the creation of Discord Bots using Javascript and the Discord.js library. The framework is designed to be easy to use and understand.

## Examples

### Basic Button
```js
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
```

### Button with variable(s) passed
```js
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
```

### Basic Command
```js
const { ApplicationCommandOptionType, MessageFlags } = require("discord.js");
const { CommandHandler } = require("../../Utils/Classes.js");
const guilds = require("../../Configs/guilds.json");

module.exports = class extends CommandHandler {
    constructor(client) {
        super(client);
        this.name = "test";
        this.description = "Test command";
        this.guildId = guilds.TestGuild; // Replace with your guild ID for guild-specific commands, or just remove this line for global commands
        this.defaultMemberPermissions = null; // Set to null for no permissions required, or use PermissionFlagsBits constants
        this.options = [
            {
                name: "test",
                description: "Test required string option",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ];
    }

    async execute(interaction) {
        const testString = interaction.options.getString("test");
        if (!testString) return interaction.reply({ content: "Error: Missing required option.", flags: MessageFlags.Ephemeral });

        await interaction.reply({ content: `Command executed successfully with option: ${testString}`, flags: MessageFlags.Ephemeral });
    }
}
```

### Basic Modal
```js
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
```

### Modal with variable(s) passed
```js
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
```

### Basic Select Menu
```js
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
```

### Select Menu with variable(s) passed
```js
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
```

## Help

If you need help with the framework, feel free to contact me via [Discord](https://discord.com/users/281844673398571011).

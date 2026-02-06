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
    };
};
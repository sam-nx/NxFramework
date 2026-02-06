// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

const fs = require("fs");
const path = require("path");
const client = require("./Client.js");
require("colors");
const { MessageFlags } = require("discord.js");
const genConfig = require("../Configs/general.json");

let buttons_files = fs.readdirSync(path.join(__dirname, '../Interactions/Buttons/'));

console.log("[NxFramework]".blue, "### LOADING BUTTONS ###".yellow);

client.on("interactionCreate", async interaction => {
    if (Date.now() - interaction.createdTimestamp > 900000) { // 15 minutes
        console.log("[NxFramework]".blue, 'Interaction expired.');
        return;
    }

    buttons_files.forEach(file => {
        if (!file.endsWith(".js")) return;
        
        let button = require(`../Interactions/Buttons/${file}`);
        button = new button(client);

        if (interaction.isButton()) {
            for (let i = 0; i < button.customIds.length; i++) {
                const id = button.customIds[i];
                if (id.endsWith("{%var%}") && interaction.customId.startsWith(id.split("{%var%}")[0])) {
                    button.customVar = interaction.customId.split(id.split("{%var%}")[0])[1];
                    try {
                        button.execute(interaction);
                    } catch (error) {
                        console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                        interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                    }
                }
            }

            if (button.customIds.includes(interaction.customId)) {
                try {
                    button.execute(interaction);
                } catch (error) {
                    console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                    interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        }
    });
})

buttons_files.forEach(file => {
    if (!file.endsWith(".js")) return;
    
    let button = require(`../Interactions/Buttons/${file}`);
    button = new button(client);
    console.log("[NxFramework]".blue, `Button loaded: ${button.customIds.join(", ")}`.cyan);
});

console.log("[NxFramework]".blue, "### LOADING MODALS ###".yellow);

let modals_files = fs.readdirSync(path.join(__dirname, '../Interactions/Modals/'));

modals_files.forEach(file => {
    let modal = require(`../Interactions/Modals/${file}`);
    modal = new modal(client);

    client.on("interactionCreate", async interaction => {
        if (Date.now() - interaction.createdTimestamp > 900000) { // 15 minutes
            console.log("[NxFramework]".blue, 'Interaction expired.');
            return;
        }

        if (interaction.isModalSubmit()) {
            for (let i = 0; i < modal.customIds.length; i++) {
                const id = modal.customIds[i];
                if (id.endsWith("{%var%}") && interaction.customId.startsWith(id.split("{%var%}")[0])) {
                    modal.customVar = interaction.customId.split(id.split("{%var%}")[0])[1];
                    try {
                        modal.execute(interaction);
                    } catch (error) {
                        console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                        interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                    }
                }
            }
            
            if (modal.customIds.includes(interaction.customId)) {
                try {
                    modal.execute(interaction);
                } catch (error) {
                    console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                    interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        }
    })

    console.log("[NxFramework]".blue, `Modal loaded: ${modal.customIds.join(", ")}`.cyan);
});

console.log("[NxFramework]".blue, "### LOADING SELECTS ###".yellow);

let selects_files = fs.readdirSync(path.join(__dirname, '../Interactions/SelectMenues/'));

// TODO: Optimize this (only one listener with a loop inside maybe ?)
selects_files.forEach(file => {
    let select = require(`../Interactions/SelectMenues/${file}`);
    select = new select(client);

    client.on("interactionCreate", async interaction => {
        if (Date.now() - interaction.createdTimestamp > 900000) { // 15 minutes
            console.log("[NxFramework]".blue, 'Interaction expired.');
            return;
        }

        // TODO: Could make a switch on interaction.componentType where 3 = String; 5 = User; 6 = Role; 8 = Channel;
        if ([3, 5, 6, 8].includes(interaction.componentType)) {
            for (let i = 0; i < select.customIds.length; i++) {
                const id = select.customIds[i];
                if (id.endsWith("{%var%}") && interaction.customId.startsWith(id.split("{%var%}")[0])) {
                    select.customVar = interaction.customId.split(id.split("{%var%}")[0])[1];
                    try {
                        select.execute(interaction);
                    } catch (error) {
                        console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                        interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                    }
                }
            }
            
            if (select.customIds.includes(interaction.customId)) {
                try {
                    select.execute(interaction);
                } catch (error) {
                    console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                    interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        }
    })

    console.log("[NxFramework]".blue, `Select loaded: ${select.customIds.join(", ")}`.cyan);
});

let commands_files = fs.readdirSync(path.join(__dirname, '../Interactions/Commands/'));

client.on("ready", async () => {
    if (genConfig.devmode) await client.application.commands.set([]);

    commands_files.forEach(async (file) => {
        let command = require(`../Interactions/Commands/${file}`);
        command = new command(client);

        if (genConfig.devmode) {
            await client.application.commands.create(command, command.guildId || undefined).then(() => {
                console.log(`Command loaded: ${command.name}${command.guildId ? " in guild #" + command.guildId : ""}`.cyan);
            }).catch((error) => {
                console.error(`Error while loading command ${command.name}: ${error}`.red);
            });
        } else if (command.forceLoading) {
            await client.application.commands.create(command, command.guildId || undefined).then(() => {
                console.log(`Command loaded: ${command.name}${command.guildId ? " in guild #" + command.guildId : ""}`.cyan);
            }).catch((error) => {
                console.error(`Error while loading command ${command.name}: ${error}`.red);
            });
        }
    });

    await client.application.commands.fetch();
})

client.on("interactionCreate", async interaction => {
    if (Date.now() - interaction.createdTimestamp > 900000) { // 15 minutes
        console.log("[NxFramework]".blue, 'Interaction expired.');
        return;
    }

    commands_files.forEach((file) => {
        let command = require(`../Interactions/Commands/${file}`);
        command = new command(client);

        if (interaction.isCommand() && interaction.commandName === command.name) {
            try {
                command.execute(interaction);
            } catch (error) {
                console.log("[NxFramework]".blue, `[Interaction Error] ${error}`.red);
                interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
            }
        }
    });
});
// DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
// IF YOU DO SO, MAKE SURE YOU DIDN'T BREAK ANYTHING BEFORE CREATING A PULL REQUEST OR ISSUE

const { RoleSelectMenuBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

// Handlers

class EventHandler {
    constructor(client) {
        this.client = client;
        this.eventName = "";
    }
}

class ButtonHandler {
    constructor(client) {
        this.client = client;
        this.customIds = [];
        this.customVar = "";
    }
}

class SelectMenuHandler {
    constructor(client) {
        this.client = client;
        this.customIds = [];
    }
}

class CommandHandler {
    constructor(client) {
        this.client = client;
        this.name = "";
        this.description = "";
        this.options = [];
        this.type = ApplicationCommandType.ChatInput;
    }
}

class ModalHandler {
    constructor(client) {
        this.client = client;
        this.customIds = [];
    }
}

// Builders

class Button extends ButtonBuilder {
    /**
     * Create a button
     * @param {string} style - The style of the button ("Primary", "Secondary", "Success", "Danger", "Link")
     * @param {string} customId - The customId of the button
     * @param {string} label - The label of the button
     * @param {string} [emoji] - The emoji of the button
     * @param {string} [url] - The url of the button
     * @example
     * new Button("Primary", "test", "Test", "👍")
     * new Button("Secondary", "test", "Test")
     * new Button("Danger", "test", "Test", "🎉")
     * new Button("Link", "test", "Test", "👍", "https://google.com")
     */
    constructor(style = "Primary", customId, label, emoji = "", url = "", disabled = false) {
        super();
        switch (style) {
            case "Primary":
                style = ButtonStyle.Primary;
                break;
            case "Secondary":
                style = ButtonStyle.Secondary;
                break;
            case "Success":
                style = ButtonStyle.Success;
                break;
            case "Danger":
                style = ButtonStyle.Danger;
                break;
            case "Link":
                style = ButtonStyle.Link;
                break;
        }
        this.setStyle(style);
        if (customId != "") this.setCustomId(customId);
        this.setLabel(label);
        if (emoji != "") this.setEmoji(emoji);
        if (url != "") this.setURL(url);
        if (disabled) this.setDisabled(disabled);
    }
}

class StringSelectMenu extends StringSelectMenuBuilder {
    /**
     * Create a string select menu
     * @param {string} customId - The customId of the select menu
     * @param {string} placeholder - The placeholder of the select menu
     * @param {Array} options - The options of the select menu
     * @example
     * new StringSelectMenu("test_string", "Test", [
     *  {
     *      label: "Test",
     *      value: "test",
     *      description: "Test",
     *      emoji: "👍"
     *  }
     * ])
     */
    constructor(customId, placeholder, options = []) {
        super();
        this.setCustomId(customId);
        this.setPlaceholder(placeholder);
        this.addOptions(options);
    }
}

class RoleSelectMenu extends RoleSelectMenuBuilder {
    /**
     * Create a role select menu
     * @param {string} customId - The customId of the select menu
     * @param {string} placeholder - The placeholder of the select menu
     * @example
     * new RoleSelectMenu("test_role", "Test")
     */
    constructor(customId, placeholder, options = []) {
        super();
        this.setCustomId(customId);
        this.setPlaceholder(placeholder);
        this.addOptions(options);
    }
}

class UserSelectMenu extends UserSelectMenuBuilder {
    /**
     * Create a user select menu
     * @param {string} customId - The customId of the select menu
     * @param {string} placeholder - The placeholder of the select menu
     * @example
     * new UserSelectMenu("test_user", "Test")
     */
    constructor(customId, placeholder, options = []) {
        super();
        this.setCustomId(customId);
        this.setPlaceholder(placeholder);
        this.addOptions(options);
    }
}

class ChannelSelectMenu extends ChannelSelectMenuBuilder {
    /**
     * Create a channel select menu
     * @param {string} customId - The customId of the select menu
     * @param {string} placeholder - The placeholder of the select menu
     * @example
     * new ChannelSelectMenu("test_channel", "Test")
     */
    constructor(customId, placeholder, options = []) {
        super();
        this.setCustomId(customId);
        this.setPlaceholder(placeholder);
        this.addOptions(options);
    }
}

class Row extends ActionRowBuilder {
    /**
     * Create a row
     * @param {Array} components - The components of the row
     * @example
     * new Row([
     *  new Button("Primary", "test", "Test", "👍")
     * ])
     */
    constructor(components = []) {
        super();
        this.addComponents(components);
    }
}

class Embed extends EmbedBuilder {
    /**
     * Create an embed
     * @param {string} title - The title of the embed
     * @param {string} description - The description of the embed
     * @param {string} [color] - The color of the embed
     * @param {string} [footer] - The footer of the embed
     * @param {string} [thumbnail] - The thumbnail of the embed
     * @param {string} [image] - The image of the embed
     * @param {string} [author] - The author of the embed
     * @param {string} [url] - The url of the embed
     * @param {string} setTimestamp - Should the embed have a timestamp
     * @param {string} [fields] - The fields of the embed
     * @example
     * new Embed("Title", "Description", "#ff00ff", { text: "Footer" })
     */
    constructor(title, description, color = "", footer = "", thumbnail = "", image = "", author = "", url = "", setTimestamp = false, fields = false) {
        super();
        this.setTitle(title);
        this.setDescription(description);
        if (color != "") this.setColor(color);
        if (footer != "") this.setFooter(footer);
        if (thumbnail != "") this.setThumbnail(thumbnail);
        if (image != "") this.setImage(image);
        if (author != "") this.setAuthor(author);
        if (url != "") this.setURL(url);
        if (setTimestamp) this.setTimestamp();
        if (fields) this.addFields(fields);
    }
}

class Modal extends ModalBuilder {
    constructor(customId, title, components = []) {
        super();
        this.setCustomId(customId);
        this.setTitle(title);
        this.addComponents(components);
    }
}

class TextInput extends TextInputBuilder {
    constructor(customId, label, placeholder = "", style = "", min = 0, max = 0, value = "", required = false) {
        super();
        this.setCustomId(customId);
        this.setLabel(label);
        this.setStyle(style == "Paragraph" ? TextInputStyle.Paragraph : TextInputStyle.Short);
        this.setRequired(required);
        if (placeholder != "") this.setPlaceholder(placeholder);
        if (min != 0) this.setMinLength(min);
        if (max != 0) this.setMaxLength(max);
        if (value != "") this.setValue(value);
    }
}

module.exports = {
    EventHandler,
    ButtonHandler,
    SelectMenuHandler,
    CommandHandler,
    ModalHandler,
    Button,
    StringSelectMenu,
    RoleSelectMenu,
    UserSelectMenu,
    ChannelSelectMenu,
    Row,
    Embed,
    Modal,
    TextInput
};
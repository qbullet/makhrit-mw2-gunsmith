import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Look for something that Makhit can help you.")
    .addStringOption((option) =>
      option
        .setName("actions")
        .setDescription("what you want to do?")
        .setRequired(true)
        .addChoices({ name: "Create Blueprint", value: "create_blueprint" })
    ),
  async execute(interaction) {
    const action = interaction.options.getString("actions");

    return await interaction.reply(action);
  },
};

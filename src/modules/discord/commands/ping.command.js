import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const replyMessage = `Pong! this just use to test connection with Makhit (${new Date().toISOString()})`;

    return await interaction.reply(replyMessage);
  },
};

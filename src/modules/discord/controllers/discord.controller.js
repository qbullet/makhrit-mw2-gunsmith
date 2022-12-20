const DiscordController = {
  messageEventHandler: (client, chat) => {
    try {
      const { content } = chat;
      if (content === "test") return chat.channel.send("it works..");

      return;
    } catch (error) {
      console.error(`[ERROR ON HANDLE EVENTS] => ${error.message}`);
      return chat.channel.send(`${client.emotes.error} | ${e}`);
    }
  },

  interactionEventHandler: async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default DiscordController;

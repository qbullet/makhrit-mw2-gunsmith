const DiscordController = {
  eventHandler: (chat) => {
    const { content } = chat;
    if (content === "test") return chat.channel.send("it works..");
  },
};

export default DiscordController;

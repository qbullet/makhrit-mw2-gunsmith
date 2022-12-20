import { Client, Events, GatewayIntentBits } from "discord.js";

import DiscordController from "./controllers/discord.controller.js";
import AppVariables from "../../config/app.variables.js";
import CollectionCommands from "./commands/index.js";

const collectionCommands = new CollectionCommands();
const DiscordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
  ],
});

DiscordClient.commands = collectionCommands.getCollection();
collectionCommands.deployCommands();

DiscordClient.on("ready", () => {
  console.log(`Logged in as ${DiscordClient.user.tag}!`);

  DiscordClient.user.setActivity("work pls", {
    type: "WATCHING",
  });
});

DiscordClient.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  return DiscordController.interactionEventHandler(interaction);
});

DiscordClient.on(Events.MessageCreate, (message) => {
  return DiscordController.messageEventHandler(DiscordClient, message);
});

DiscordClient.login(AppVariables.DISCORD_BOT_TOKEN);

export default DiscordClient;

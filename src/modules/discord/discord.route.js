import DiscordController from "./controllers/discord.controller.js";
import Discord from "discord.js";
import AppVariables from "../../config/app.variables.js";

const { Client, GatewayIntentBits } = Discord;

const DiscordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

DiscordClient.on("ready", () => {
  console.log(`Logged in as ${DiscordClient.user.tag}!`);
  DiscordClient.user.setActivity("FUCK THIS SHIT! work pls", {
    type: "WATCHING",
  });
});

DiscordClient.on("messageCreate", (message) => {
  return DiscordController.eventHandler(message);
});

DiscordClient.login(AppVariables.DISCORD_BOT_TOKEN);

export default DiscordClient;

import { Collection, REST, Routes } from "discord.js";

import AppVariables from "../../../config/app.variables.js";

import ping from "./ping.command.js";
import menu from "./menu.command.js";
import createBlueprintCommand from "./create-blueprint.command.js";

const {
  DISCORD_BOT_CLIENT_ID,
  DISCORD_DEV_SERVER_GUILD_ID,
  DISCORD_BOT_TOKEN,
} = AppVariables;
const commands = [createBlueprintCommand, menu, ping];

const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);

class CommandCollection {
  collection;
  commandList;
  constructor() {
    this.collection = new Collection();
    this.commands = commands;

    this.commands.forEach((command) => {
      this.collection.set(command.data.name, command);
    });
  }

  getCollection() {
    return this.collection;
  }

  async deployCommands() {
    try {
      const commands = this.commands.map((command) => command.data.toJSON());

      await rest.put(
        Routes.applicationGuildCommands(
          DISCORD_BOT_CLIENT_ID,
          DISCORD_DEV_SERVER_GUILD_ID
        ),
        {
          body: commands,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default CommandCollection;

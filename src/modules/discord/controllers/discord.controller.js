import Discord from "discord.js";

import BlueprintService from "../../blueprint/services/blueprint.service.js";
import StatusEnum from "../../../common/status.enum.js";
import CONFIG from "../config/discord.config.js";
import DiscordValidator from "../validator/discord.validator.js";

class DiscordController {
  blueprintService;
  discordValidator;

  constructor() {
    this.blueprintService = new BlueprintService();
    this.discordValidator = new DiscordValidator();
  }

  async messageEventHandler(client, chat) {
    try {
      const { content } = chat;
      const splitMessage = content.split(" ");

      if (splitMessage[0] === CONFIG.CHAT_COMMAND.ADD_BLUEPRINT_IMAGE) {
        return await this.addBlueprintImage(client, chat);
      }
    } catch (error) {
      console.error(`[ERROR ON MESSAGE HANDLE EVENTS] => ${error.message}`);
      return chat.channel.send(`😵😵 | ** ${error.message} **`);
    }
  }

  async interactionEventHandler(interaction) {
    try {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      await command.execute(interaction);
    } catch (error) {
      console.error(`[ERROR ON INTERACTION HANDLE EVENTS] => ${error.message}`);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  async addBlueprintImage(client, chat) {
    try {
      if (!this.discordValidator.blueprintImagesValidate(chat.attachments)) {
        throw new Error("Something wrong with your images");
      }

      const [, blueprintTag] = chat.content.split(" ");
      if (!Number(blueprintTag)) {
        throw new Error("Blueprint Tag is invalid");
      }

      const blueprint = await this.blueprintService.getOne({
        blueprintTag,
        status: StatusEnum.ACTIVE,
      });
      if (!blueprint) {
        throw new Error("Blueprint not found");
      }
      if (blueprint.addedBy.id !== chat.author.id) {
        throw new Error("This blueprint is not your");
      }
      if (blueprint.imageUrls.length) {
        throw new Error("This blueprint already has image");
      }

      const imageUrls = chat.attachments.map((attachment) => attachment.url);

      await this.blueprintService.updateById(blueprint.id, {
        imageUrls,
      });

      return chat.channel.send(
        `🔫🔫(** ${blueprint.title.toUpperCase()} **) has been added image`
      );
    } catch (error) {
      console.error(`[ERROR WHILE ADDING BLUEPRINT] => ${error.message}`);
      return chat.channel.send(`😵😵 | ** ${error.message} **`);
    } finally {
      chat.delete();
    }
  }
}

export default DiscordController;

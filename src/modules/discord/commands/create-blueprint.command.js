import { SlashCommandBuilder } from "discord.js";

import BlueprintConfig from "../../blueprint/config/blueprint.config.js";
import BlueprintService from "../../blueprint/services/blueprint.service.js";

const { GUN_CATEGORY } = BlueprintConfig;
const blueprintService = new BlueprintService();

export default {
  data: new SlashCommandBuilder()
    .setName("create-blueprint")
    .setDescription("Save your awesome blueprint to impress everyone")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("What is that called?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("What is category of this beauty?")
        .setRequired(true)
        .addChoices(
          {
            name: GUN_CATEGORY.ASSAULT_RIFLE,
            value: GUN_CATEGORY.ASSAULT_RIFLE,
          },
          {
            name: GUN_CATEGORY.SUB_MACHINE_GUN,
            value: GUN_CATEGORY.SUB_MACHINE_GUN,
          },
          {
            name: GUN_CATEGORY.BATTLE_RIFLE,
            value: GUN_CATEGORY.BATTLE_RIFLE,
          },
          {
            name: GUN_CATEGORY.HANDGUN,
            value: GUN_CATEGORY.HANDGUN,
          },
          {
            name: GUN_CATEGORY.LIGHT_MACHINE_GUN,
            value: GUN_CATEGORY.LIGHT_MACHINE_GUN,
          },
          {
            name: GUN_CATEGORY.MARKSMAN_RIFLE,
            value: GUN_CATEGORY.MARKSMAN_RIFLE,
          },
          {
            name: GUN_CATEGORY.SHOTGUN,
            value: GUN_CATEGORY.SHOTGUN,
          },
          {
            name: GUN_CATEGORY.SNIPER_RIFLE,
            value: GUN_CATEGORY.SNIPER_RIFLE,
          }
        )
    )
    .addStringOption((option) =>
      option.setName("model").setDescription("What gun is that?")
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("tell me about this gun?")
    ),
  async execute(interaction) {
    const title = interaction.options.getString("title");
    const category = interaction.options.getString("category");
    const model = interaction.options.getString("model");
    const description = interaction.options.getString("description");

    const blueprint = await blueprintService.create({
      title,
      category,
      model,
      description,
      addedBy: {
        id: interaction.user.id,
        nickname: interaction.member.nickname,
        username: interaction.user.username,
      },
      guildId: interaction.guildId,
    });

    return await interaction.reply(
      `🎉🎉 ${
        interaction.member.nickname
      }'s blueprint has been created (**${blueprint.title.toUpperCase()}**). 📝📝 To complete, please use ** mk:add-bp-image ${
        blueprint.blueprintTag
      } ** to add attach your images.`
    );
  },
};

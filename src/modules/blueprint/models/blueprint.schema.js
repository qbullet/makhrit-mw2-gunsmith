import { Schema, model } from "mongoose";

import AutoIncrement from "../../../plugins/increment.plugin.js";

import StatusEnum from "../../../common/status.enum.js";
import Config from "../config/blueprint.config.js";

const AddedBySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const BlueprintSchema = new Schema(
  {
    blueprintTag: {
      type: Number,
      required: true,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
      max: 6,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(Config.GUN_CATEGORY),
    },
    model: {
      type: String,
      default: "UNKNOWN",
    },
    description: {
      type: String,
      default: "",
    },
    addedBy: {
      type: AddedBySchema,
      default: null,
    },
    guildId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
    },
  },
  { timestamps: true, strict: true }
);

BlueprintSchema.plugin(AutoIncrement, {
  id: "blueprint_seq",
  inc_field: "blueprintTag",
});

const BlueprintModel = model("blueprints", BlueprintSchema);

export default BlueprintModel;

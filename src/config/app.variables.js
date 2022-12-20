import dotenv from "dotenv";
dotenv.config();

export default {
  DB_CONNECTION: process.env.DB_CONNECTION,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  DISCORD_BOT_CLIENT_ID: process.env.DISCORD_BOT_CLIENT_ID,
  DISCORD_DEV_SERVER_GUILD_ID: process.env.DISCORD_DEV_SERVER_GUILD_ID,
};

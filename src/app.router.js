import express from "express";
import "./modules/discord/discord.route.js";
import BlueprintRouter from "./modules/blueprint/blueprint.route.js";

const app = express();

app.use("/blueprint", BlueprintRouter);

export default app;

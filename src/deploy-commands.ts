import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "./config/app.config";
import { Command } from "./types/command";
import { CronJob } from "cron";
import * as commandModules from "./commands";

const commands = [];

for (const module of Object.values<Command>(commandModules)) {
    commands.push(module.data);
}

const rest = new REST({version: '9'}).setToken(config.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {body: commands}).then(() => {
    console.log("Succesfully registered application commands!");
}).catch(console.error);
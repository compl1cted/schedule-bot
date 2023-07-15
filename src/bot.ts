import { Client } from "discord.js";
import { config } from "./config/app.config";
import { CronJob, CronCommand} from "cron"
import * as commandModules from "./commands";

export const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"]
});

const commands = Object(commandModules);

// export function scheduleMessage(cronCommand: CronCommand, msgToSend: string) {
//     var job = new CronJob(
//         "10",
//         cronCommand, // cron expression that describes when the function below is executed
//     function() {
//       channel.send(msgToSend); //insert here what you want to do at the given time
//     },
//     true,
//     "+3",
//     'America/Los_Angeles' //insert your server time zone here
// );
// }

client.once("ready", () => {
    console.log("Discord bot ready!");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;
    commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_TOKEN);
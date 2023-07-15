import { CronJob } from "cron"
import { client, scheduleMessage } from "./bot";
import { Client, Events } from "discord.js";
let upcomingEvents = []; //array of calendar events
const gcpClient = authorize().then(listEvents);
const channel = client.channels.cache.get('1049384497017266228');

// method to convert date values to cron expressions
const dateToCron = (date: Date) => {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};



client.once(Events.ClientReady, (c: Client) => {
   console.log('Ready! Logged in as ', c.user?.tag);
   upcomingEvents.forEach(element => { scheduleMessage(element.title, element.readabledate) });
});
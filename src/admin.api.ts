import fastify from "fastify";
import { Client } from "discord.js";

export function CreateRestApi(client: Client) {
    const app = fastify();

    app.listen({port: 3000});
}
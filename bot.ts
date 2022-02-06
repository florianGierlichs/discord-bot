import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import fs from "fs";
import { Event } from "./types/events";

dotenv.config();

export const startBot = (botToken: string) => {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ["CHANNEL"],
  });

  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

  eventFiles.forEach(async (file) => {
    const { default: event }: { default: Event } = await import(
      `./events/${file}`
    );
    client.on(event.name, (...args) => event.execute(...args));
  });

  client.once("ready", () => {
    console.log("Client Ready!");
  });

  client
    .login(botToken)
    .then(() => console.log("WebSocket connected to discord!"));
};

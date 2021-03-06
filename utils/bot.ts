import * as dotenv from "dotenv";
import { Client, GuildScheduledEvent, Intents } from "discord.js";
import fs from "fs";
import { Event } from "../types/events";
import { log } from "./log";

dotenv.config();

export const startBot = (botToken: string) => {
  log("Start bot");
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
    .filter((file) => file.endsWith(".ts"));

  eventFiles.forEach(async (file) => {
    const { default: event }: { default: Event } = await import(
      `../events/${file}`
    );
    client.on(event.name, (...args: GuildScheduledEvent[]) =>
      event.execute(...args)
    );
  });

  client.once("ready", () => {
    console.log("Discord Client Ready!");
  });

  client
    .login(botToken)
    .then(() =>
      client.user?.setActivity("!register-email <your@email.com>", {
        type: "LISTENING",
      })
    )
    .then(() => console.log("WebSocket connected to discord!"));
};

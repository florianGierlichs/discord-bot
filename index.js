require("dotenv").config();

const { Client, Intents } = require("discord.js");
const fs = require("fs");

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["CHANNEL"],
});

client.once("ready", () => {
  console.log("Client Ready!");
});

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

eventFiles.forEach((file) => {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args));
});

client.login(BOT_TOKEN).then(console.log("WebSocket connected to discord!"));

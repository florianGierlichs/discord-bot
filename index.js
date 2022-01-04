require("dotenv").config();

const { Client, Intents } = require("discord.js");

const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILD_SCHEDULED_EVENTS],
});
client.login(TOKEN).then(console.log("läuft"));

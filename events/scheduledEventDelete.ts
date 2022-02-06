import { GuildScheduledEvent } from "discord.js";
import sendMail from "../utils/sendMail";

module.exports = {
  name: "guildScheduledEventDelete",
  execute(event: GuildScheduledEvent) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail("delete", event);
    }
  },
};

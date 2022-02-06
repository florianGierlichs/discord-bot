import { GuildScheduledEvent } from "discord.js";
import sendMail from "../utils/sendMail";

export default {
  name: "guildScheduledEventUpdate",
  execute(...events: GuildScheduledEvent[]) {
    if (events[1].channelId === process.env.CHANNEL_ID) {
      sendMail("update", events[1]);
    }
  },
};

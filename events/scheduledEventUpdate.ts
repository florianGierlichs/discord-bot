import { GuildScheduledEvent } from "discord.js";
import { sendEventActionEmails } from "../utils/emailService";

export default {
  name: "guildScheduledEventUpdate",
  execute(...events: GuildScheduledEvent[]) {
    if (events[1].channelId === process.env.CHANNEL_ID) {
      sendEventActionEmails("update", events[1]);
    }
  },
};

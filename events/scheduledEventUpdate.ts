import { GuildScheduledEvent } from "discord.js";
import { sendEventActionEmail } from "../utils/emailService";

export default {
  name: "guildScheduledEventUpdate",
  execute(...events: GuildScheduledEvent[]) {
    if (events[1].channelId === process.env.CHANNEL_ID) {
      sendEventActionEmail("update", events[1]);
    }
  },
};

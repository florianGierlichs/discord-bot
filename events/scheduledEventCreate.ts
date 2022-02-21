import { GuildScheduledEvent } from "discord.js";

import { sendEventActionEmails } from "../utils/emailService";

export default {
  name: "guildScheduledEventCreate",
  execute(event: GuildScheduledEvent) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendEventActionEmails("create", event);
    }
  },
};

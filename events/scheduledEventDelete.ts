import { GuildScheduledEvent } from "discord.js";
import { sendEventActionEmail } from "../utils/emailService";

export default {
  name: "guildScheduledEventDelete",
  execute(event: GuildScheduledEvent) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendEventActionEmail("delete", event);
    }
  },
};

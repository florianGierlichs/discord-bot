import { GuildScheduledEvent } from "discord.js";
import convertTimestamp from "../utils/convertTimestamp";
import { log } from "../utils/log";
import { sendEventActionEmails } from "../utils/emailService";

export default {
  name: "guildScheduledEventCreate",
  execute(event: GuildScheduledEvent) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendEventActionEmails("create", event);

      if (event.scheduledStartTimestamp) {
        log(
          "lean-coffee event created: ",
          convertTimestamp(event.scheduledStartTimestamp)
        );
      } else {
        log("lean-coffee event created: ", "NO TIMESTAMP");
      }
    }
  },
};

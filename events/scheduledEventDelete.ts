import { GuildScheduledEvent } from "discord.js";
import convertTimestamp from "../utils/convertTimestamp";
import { sendEventActionEmails } from "../utils/emailService";
import { log } from "../utils/log";

export default {
  name: "guildScheduledEventDelete",
  execute(event: GuildScheduledEvent) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendEventActionEmails("delete", event);

      if (event.scheduledStartTimestamp) {
        log(
          "lean-coffee event deleted: ",
          convertTimestamp(event.scheduledStartTimestamp)
        );
      } else {
        log("lean-coffee event deleted: ", "NO TIMESTAMP");
      }
    }
  },
};

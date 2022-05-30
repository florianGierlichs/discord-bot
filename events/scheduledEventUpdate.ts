import { GuildScheduledEvent } from "discord.js";
import convertTimestamp from "../utils/convertTimestamp";
import { sendEventActionEmails } from "../utils/emailService";
import { log } from "../utils/log";

export default {
  name: "guildScheduledEventUpdate",
  execute(...events: GuildScheduledEvent[]) {
    if (events[1].channelId === process.env.CHANNEL_ID) {
      sendEventActionEmails("update", events[1]);

      if (events[1].scheduledStartTimestamp) {
        log(
          "lean-coffee event updated: ",
          convertTimestamp(events[1].scheduledStartTimestamp)
        );
      } else {
        log("lean-coffee event updated: ", "NO TIMESTAMP");
      }
    }
  },
};

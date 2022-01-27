const sendMail = require("../utils/sendMail");

module.exports = {
  name: "guildScheduledEventUpdate",
  execute(...events) {
    if (events[1].channelId === process.env.CHANNEL_ID) {
      sendMail("update", events[1]);
    }
  },
};

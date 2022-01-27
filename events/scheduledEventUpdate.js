const sendMail = require("../utils/sendMail");

module.exports = {
  name: "guildScheduledEventUpdate",
  execute(event) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail("update", event);
    }
  },
};

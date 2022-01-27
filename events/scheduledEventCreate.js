const sendMail = require("../utils/sendMail");

module.exports = {
  name: "guildScheduledEventCreate",
  execute(event) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail("create", event);
    }
  },
};

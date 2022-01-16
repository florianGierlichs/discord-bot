const sendMail = require("../sendMail");

module.exports = {
  name: "guildScheduledEventUpdate",
  execute(event) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail("update", event);
    }
  },
};

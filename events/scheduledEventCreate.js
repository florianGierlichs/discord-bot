const sendMail = require("../sendMail");

module.exports = {
  name: "guildScheduledEventCreate",
  execute(event) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail(event);
    }
  },
};

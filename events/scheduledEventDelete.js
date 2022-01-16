const sendMail = require("../sendMail");

module.exports = {
  name: "guildScheduledEventDelete",
  execute(event) {
    if (event.channelId === process.env.CHANNEL_ID) {
      sendMail("delete", event);
    }
  },
};

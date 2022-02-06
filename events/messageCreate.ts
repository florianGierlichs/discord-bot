import { Message } from "discord.js";
import validator from "validator";

export default {
  name: "messageCreate",
  execute(message: Message) {
    if (message.channel.type == "DM") {
      if (message.content.startsWith("!register-email ")) {
        const userInput = message.content.slice(16).trim();
        const validEmail = validator.isEmail(userInput);

        // GET userInput from DB and check if exists
        // if userInput is allready in DB send respond message
        // else send email with validation link and send respond message with email validation notification
        // await email validation from user via link and GET
        // save userInput(valid email =)) in DB
      }
      return;
    }
  },
};

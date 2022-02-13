import { Message } from "discord.js";
import validator from "validator";
import { monooseHelperInstance } from "../utils/MongoosHelper";
import { sendVerificationEmail } from "../utils/emailService";

export default {
  name: "messageCreate",
  execute(message: Message) {
    if (message.channel.type == "DM") {
      if (message.content.startsWith("!register-email ")) {
        const userInput = message.content.slice(16).trim();
        if (validator.isEmail(userInput)) {
          (async () => {
            try {
              const existingUser =
                await monooseHelperInstance.checkExistingEmail(userInput);

              if (!existingUser) {
                // Add to DB and send verification email
                sendVerificationEmail(userInput);
                message.author.send(
                  "Got it! Please check you emails to verify this email-adress  :e_mail: "
                );
                return;
              }

              if (existingUser.isVerified === false) {
                message.author.send(
                  "Your email-adress isn't verified jet. Please check your emails to verfiy this email-adress  :eyes:"
                );
                return;
              }

              if (existingUser.isVerified) {
                message.author.send(
                  "Your email-adress is already registered. Glad you are part of the lean-coffee team  :fire:"
                );
                return;
              }
            } catch (e) {
              if (e instanceof Error) {
                message.author.send(
                  "Hmmm, something went wrong. Please contact @papa-stromberg#8281 for support  :poop:"
                );
                console.log(e.message);
              }
            }
          })();
        } else {
          message.author.send(
            "Please insert a correct email adress like this: ``!register-email <your@email.com>``"
          );
        }

        // else send email with validation link and send respond message with email validation notification
        // await email validation from user via link and GET
        // save userInput(valid email =)) in DB
      }
      return;
    }
  },
};

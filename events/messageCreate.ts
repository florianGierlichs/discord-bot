import { Message } from "discord.js";
import validator from "validator";
import randomstring from "randomstring";
import { monooseHelperInstance } from "../utils/MongoosHelper";
import { sendVerificationEmail } from "../utils/emailService";

export default {
  name: "messageCreate",
  async execute(message: Message) {
    if (message.author.bot) return;

    if (message.channel.type == "DM") {
      if (message.content.startsWith("!register-email ")) {
        const userInput = message.content.slice(16).trim();
        if (validator.isEmail(userInput)) {
          try {
            const existingUser = await monooseHelperInstance.getUserById(
              message.author.id
            );

            if (!existingUser) {
              const verificationToken = randomstring.generate();

              await monooseHelperInstance.saveUser(
                message.author.username,
                message.author.id,
                userInput,
                verificationToken
              );

              sendVerificationEmail(
                userInput,
                message.author.id,
                verificationToken
              );

              message.author.send(
                "Got it! Please check you emails to verify this email-adress  :e_mail: "
              );
              return;
            }

            if (!existingUser.isVerified) {
              message.author.send(
                "Your email-adress isn't verified jet. Please check your emails to verfiy this email-adress  :eyes:"
              );
              return;
            }

            if (existingUser.isVerified) {
              message.author.send(
                "You already registered your email adress " +
                  "``" +
                  `${existingUser.email}` +
                  "``" +
                  ". Glad you are part of the lean-coffee team  :fire:"
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
        } else {
          message.author.send(
            "Please insert a correct email adress like this: ``!register-email <your@email.com>``"
          );
        }
      }
      return;
    }
  },
};

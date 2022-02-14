import { GuildScheduledEvent } from "discord.js";
import nodemailer from "nodemailer";
import convertTimestamp from "./convertTimestamp";

type Action = "create" | "delete" | "update";

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_TO = process.env.MAIL_TO;

if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS || !MAIL_TO) {
  throw new Error("Email credentials missing");
}

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const handleEventAction = (action: Action) => {
  switch (action) {
    case "create":
      return "created";
    case "delete":
      return "canceled";
    case "update":
      return "changed";
    default:
      throw new Error("Unknown event action! Mails not sent!");
  }
};

export const sendEventActionEmail = async (
  action: Action,
  event: GuildScheduledEvent
) => {
  if (!event?.scheduledStartTimestamp) {
    return;
  }

  try {
    await transporter.sendMail({
      from: `Lean-Coffee bot ${MAIL_USER}`,
      to: `${MAIL_TO}`,
      subject: `Event was ${handleEventAction(action)}!`,
      text: `${event.name}\n ${event.description}`,
      html: `<b style="font-size:18px">${event.name}, ${convertTimestamp(
        event?.scheduledStartTimestamp
      )}</b><br><br> ${event.description}`,
    });
    console.log("Event emails sent!");
  } catch (e) {
    console.error(e);
  }
};

export const sendVerificationEmail = async (
  mailTo: string,
  discordId: string
) => {
  const verificationUrl: string =
    (process.env.BASE_URL || "http://localhost:3000") +
    `/lean-coffee-email-verification/${discordId}`;

  try {
    await transporter.sendMail({
      from: `Lean-Coffee bot ${MAIL_USER}`,
      to: mailTo,
      subject: `Verify your email`,
      text: "",
      html: `<p style="font-size:14px">Please verify your email to get lean-coffee event notifications: <a href=${verificationUrl}>VERIFY</a></p>`,
    });
    console.log("Verification email sent!");
  } catch (e) {
    console.error(e);
  }
};

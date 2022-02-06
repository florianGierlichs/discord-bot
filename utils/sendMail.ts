import { GuildScheduledEvent } from "discord.js";
import nodemailer from "nodemailer";
import convertTimestamp from "./convertTimestamp";

type Action = "create" | "delete" | "update";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
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

export default async (action: Action, event: GuildScheduledEvent) => {
  if (!event?.scheduledStartTimestamp) {
    return;
  }

  try {
    await transporter.sendMail({
      from: `Lean-Coffee bot ${process.env.MAIL_USER}`,
      to: `${process.env.MAIL_TO}`,
      subject: `Event was ${handleEventAction(action)}!`,
      text: `${event.name}\n ${event.description}`,
      html: `<b style="font-size:18px">${event.name}, ${convertTimestamp(
        event?.scheduledStartTimestamp
      )}</b><br><br> ${event.description}`,
    });
    console.log("mails sent!");
  } catch (e) {
    console.error(e);
  }
};

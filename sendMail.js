const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const handleEventAction = (action) => {
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

const sendMail = async (action, event) => {
  try {
    await transporter.sendMail({
      from: `Lean-Coffee bot ${process.env.MAIL_USER}`,
      to: `${process.env.MAIL_TO}`,
      subject: `Event was ${handleEventAction(action)}!`,
      text: `${event.name}\n ${event.description}`,
      html: `<b>${event.name}</b><br><br> ${event.description}`,
    });
    console.log("mails sent!");
  } catch (e) {
    console.error(e);
  }
};

module.exports = sendMail;

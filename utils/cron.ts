import { CronJob } from "cron";
import { log } from "./log";
import { getEvents } from "./getEvents";
import { sendReminderEmail } from "./emailService";

const handleJob = async () => {
  log("Run cronjob");

  const timezoneOffset = new Date().getTimezoneOffset();
  const equalTimezoneOffset = timezoneOffset / 60;
  const startHour = 0 + equalTimezoneOffset;
  const endHour = 23 + equalTimezoneOffset;
  const today = new Date();
  const tomorrowTimestamp = today.setDate(new Date().getDate() + 1);
  const tomorrowA = new Date(tomorrowTimestamp);
  const tomorrowB = new Date(tomorrowTimestamp);
  const tomorrowStart = tomorrowA.setUTCHours(startHour, 0, 0, 0);
  const tomorrowEnd = tomorrowB.setUTCHours(endHour, 59, 59, 999);

  const leanCoffeeEvents = await getEvents();

  if (leanCoffeeEvents === undefined) {
    log("Cronjob => no lean-coffee events scheduled!");
    return;
  }

  const eventsTommorow = leanCoffeeEvents.filter((e) => {
    const eventTimestamp = new Date(e.scheduled_start_time).getTime();
    return eventTimestamp > tomorrowStart && eventTimestamp < tomorrowEnd;
  });

  if (eventsTommorow.length === 0) {
    log("Cronjob => no lean-coffee events for tomorrow scheduled!");
    return;
  }
  console.log("eventsTommorow =>", eventsTommorow);
  eventsTommorow.forEach((event) => {
    sendReminderEmail(event);
  });
};

const job = new CronJob(
  "0 00 20 * * *",
  function () {
    handleJob();
  },
  null,
  false,
  "Europe/Berlin"
);

export const startCronjob = () => {
  log("Start cronjob");
  job.start();
};

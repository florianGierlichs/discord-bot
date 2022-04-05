import { Collection, GuildScheduledEvent } from "discord.js";

export default (
  events: Collection<
    string,
    GuildScheduledEvent<"SCHEDULED" | "ACTIVE" | "COMPLETED" | "CANCELED">
  >
) => {
  console.log("EVENTS:::", events);
  const leanCoffeeEvents = [...events]
    .filter((event) => {
      return event[1].channelId === process.env.CHANNEL_ID;
    })
    .map((event) => event[1]);

  const now = new Date().getTime();
  let closest = Infinity;

  leanCoffeeEvents.forEach((event) => {
    const scheduledTimeStamp = event?.scheduledStartTimestamp;

    if (!scheduledTimeStamp) {
      return;
    }

    if (scheduledTimeStamp >= now && scheduledTimeStamp < closest) {
      closest = scheduledTimeStamp;
    }
  });

  const upcomingLeanCoffeeEvent = leanCoffeeEvents.find(
    (event) => event.scheduledStartTimestamp === closest
  );

  return upcomingLeanCoffeeEvent;
};

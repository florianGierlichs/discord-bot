import fetch from "node-fetch";
import { log } from "./log";

const GUILD_ID = process.env.GUILD_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

export interface ScheduledEvent {
  id: string;
  channel_id: string;
  name: string;
  description: string;
  scheduled_start_time: string;
}

const isInstanceOfScheduledEvent = (obj: any): obj is ScheduledEvent => {
  return (
    "id" in obj &&
    "channel_id" in obj &&
    "scheduled_start_time" in obj &&
    "name" in obj &&
    "description" in obj
  );
};

export const getEvents = async () => {
  try {
    log("Fetch all events");
    const response = await fetch(
      `https://discord.com/api/guilds/${GUILD_ID}/scheduled-events`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`,
        },
      }
    );

    const allEvents = await response.json();

    if (
      Array.isArray(allEvents) &&
      allEvents.every((event) => isInstanceOfScheduledEvent(event))
    ) {
      const leanCoffeeEvents = (allEvents as ScheduledEvent[]).filter(
        (event) => {
          return event.channel_id === CHANNEL_ID;
        }
      );
      return leanCoffeeEvents;
    } else {
      throw new Error("API response differ at runtime");
    }
  } catch (e) {
    if (e instanceof Error) {
      log("Could not return events =>", e);
    }
  }
};

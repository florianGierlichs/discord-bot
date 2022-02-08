import { GuildScheduledEvent } from "discord.js";

export interface Event {
  name: string;
  execute: (...args: GuildScheduledEvent[]) => void;
}

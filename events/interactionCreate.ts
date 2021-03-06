import { Interaction } from "discord.js";
import getUpcomingEvent from "../utils/getUpcomingEvent";

export default {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    (async () => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      switch (commandName) {
        case "ping":
          await interaction.reply({ content: "Pong!", ephemeral: true });
          break;

        case "server":
          if (!interaction.guild) break;
          await interaction.reply({
            content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
            ephemeral: true,
          });
          break;

        case "user":
          await interaction.reply({
            content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nYour username: ${interaction.user.username}`,
            ephemeral: true,
          });
          break;

        case "lean-coffee":
          if (!interaction.guild) break;
          const upcomingLeanCoffeeEvent = getUpcomingEvent(
            await interaction.guild.scheduledEvents.fetch()
          );

          await interaction.reply({
            content: upcomingLeanCoffeeEvent
              ? "Upcoming lean-coffee event: " +
                `${upcomingLeanCoffeeEvent}` +
                ". If you want to get email notifications about all lean-coffee events, you can register your email to <@" +
                `${process.env.CLIENT_ID}` +
                "> with the command " +
                "``!register-email <your@email.com>``"
              : "There is no scheduled Lean-Coffee at the moment! If you want to get email notifications about all lean-coffee events, you can register your email to <@" +
                `${process.env.CLIENT_ID}` +
                "> with the command " +
                "``!register-email <your@email.com>``",
            ephemeral: true,
          });
          break;
      }
    })();
  },
};

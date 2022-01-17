const getUpcomingEvent = require("../utils/getUpcomingEvent");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    (async () => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      switch (commandName) {
        case "ping":
          await interaction.reply({ content: "Pong!", ephemeral: true });
          break;

        case "server":
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
          const upcomingLeanCoffeeEvent = getUpcomingEvent(
            await interaction.guild.scheduledEvents.fetch()
          );

          await interaction.reply({
            content: upcomingLeanCoffeeEvent
              ? `Upcoming lean-coffee event: ${upcomingLeanCoffeeEvent}`
              : "There is no scheduled Lean-Coffee at the moment!",
            ephemeral: true,
          });
          break;
      }
    })();
  },
};

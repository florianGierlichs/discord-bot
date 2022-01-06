module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    (async () => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      if (commandName === "ping") {
        await interaction.reply({ content: "Pong!", ephemeral: true });
      } else if (commandName === "server") {
        await interaction.reply({
          content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
          ephemeral: true,
        });
      } else if (commandName === "user") {
        await interaction.reply({
          content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nYour username: ${interaction.user.username}`,
          ephemeral: true,
        });
      }
    })();
  },
};

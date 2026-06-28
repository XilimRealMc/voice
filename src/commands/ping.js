const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Cek apakah bot online"),

  async execute(interaction) {
    const latency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.reply({
      content: `🏓 **Pong!**\n📡 Latency: \`${latency}ms\`\n💓 API: \`${apiLatency}ms\``,
    });
  },
};

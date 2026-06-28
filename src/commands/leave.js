const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Bot keluar dari voice channel"),

  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.reply({
        content: "❌ Bot lagi gak ada di voice channel mana pun.",
        ephemeral: true,
      });
    }

    const channelId = connection.joinConfig.channelId;
    const channel = interaction.guild.channels.cache.get(channelId);
    const channelName = channel?.name || "voice channel";

    connection.destroy();
    console.log(`[VC] Left: ${channelName} in ${interaction.guild.name}`);

    await interaction.reply({
      content: `👋 Bot keluar dari **${channelName}**.`,
    });
  },
};

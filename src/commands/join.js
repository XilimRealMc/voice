const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Bot masuk ke voice channel lo")
    .addChannelOption((opt) =>
      opt
        .setName("channel")
        .setDescription("Pilih VC yang mau dimasukin (default: VC lo sekarang)")
        .setRequired(false)
    ),

  async execute(interaction) {
    // Cek apakah user ada di VC
    const memberVC = interaction.member?.voice?.channel;
    const targetChannel = interaction.options.getChannel("channel") || memberVC;

    if (!targetChannel) {
      return interaction.reply({
        content: "❌ Lo harus ada di voice channel dulu, atau pilih channel-nya!",
        ephemeral: true,
      });
    }

    // Cek permission bot
    const permissions = targetChannel.permissionsFor(interaction.guild.members.me);
    if (!permissions.has(PermissionFlagsBits.Connect) || !permissions.has(PermissionFlagsBits.Speak)) {
      return interaction.reply({
        content: "❌ Bot gak punya permission buat masuk ke VC itu.",
        ephemeral: true,
      });
    }

    try {
      const connection = joinVoiceChannel({
        channelId: targetChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
      });

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(`[VC] Joined: ${targetChannel.name} in ${interaction.guild.name}`);
      });

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        try {
          connection.destroy();
        } catch {}
      });

      await interaction.reply({
        content: `✅ Bot masuk ke **${targetChannel.name}**!`,
      });
    } catch (error) {
      console.error("[VC] Join error:", error);
      await interaction.reply({
        content: "❌ Gagal masuk ke voice channel.",
        ephemeral: true,
      });
    }
  },
};

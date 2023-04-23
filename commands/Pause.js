const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),

    async execute(interaction) {
            
            const connection = getVoiceConnection(interaction.guildId);
            const player = connection.state.subscription.player;
            player.pause();
            await interaction.reply({content:"Song paused !"});
            console.log(player.state.status);
        },
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause the current song'),
        
    async execute(interaction) {

            const connection = getVoiceConnection(interaction.guildId);
            const player = connection.state.subscription.player;
            player.unpause();
            await interaction.reply({content:"Song unpaused !"});
            console.log(player.state.status);
        },
};

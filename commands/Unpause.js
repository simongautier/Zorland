const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause the current song'),
        
    async execute(interaction) {

        const GetVerif = interaction.member.voice.channel;
        if (!GetVerif) {
            await interaction.reply('Merci de rejoindre un salon vocal pour utiliser cette commande !');
            return;
        }
        
            const connection = getVoiceConnection(interaction.guildId);
            const player = connection.state.subscription.player;
            player.unpause();
            await interaction.reply({content:"Song unpaused !"});
            console.log(player.state.status);
        },
};

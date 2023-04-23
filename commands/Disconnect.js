const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect the bot from the voice channel'),
        
    async execute(interaction) {
            
                const connection = getVoiceConnection(interaction.guildId);
                connection.destroy();
                await interaction.reply({content:"Disconnected !"});
                console.log(connection.state.status);
            }
};

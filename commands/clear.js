const { SlashCommandBuilder } = require('discord.js');


module.exports = {  
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages.'),

        async execute(interaction) {
            //clear all messages
        let fetched = await interaction.channel.messages.fetch({limit: 10});
        interaction.channel.bulkDelete(fetched);
        await interaction.reply({ content: 'messages effacés', ephemeral: true })
        .then
        (setTimeout(() => {
            interaction.deleteReply()
            }, 3000))
            .catch(console.error)
    }
}

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Client, GuildChannelManager, ChannelManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilangvo')
        .setDescription("Listing des joueurs de la guilde inscrits aux différentes activités"),
    async execute(interaction) {

        let GVO = [];
        let GVOString = GVO.join('\n');

        await interaction.guild.members.fetch();
        await interaction.guild.members.cache.forEach(member => {
            if (member.roles.cache.some(role => role.name === 'gvo')) {
                GVO.push(member.user.username);
                GVOString = GVO.join('\n');
                }
                console.log("récupération des membres")

                if (GVOString === '') {
                    GVOString = 'Aucun joueur inscrit';
                }

                return GVOString;
            });

        let embed = new EmbedBuilder()
            .setTitle('Bilan des inscriptions')
            .setDescription(`${GVOString}`)
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });

    }
}





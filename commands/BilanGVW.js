const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Client, GuildChannelManager, ChannelManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilangvw')
        .setDescription("Listing des joueurs de la guilde inscrits aux différentes activités"),
    async execute(interaction) {

        let GVW = [];
        let GVWString = GVW.join('\n');

        await interaction.guild.members.fetch();
        await interaction.guild.members.cache.forEach(member => {
            if (member.roles.cache.some(role => role.name === 'gvgworld')) {
                GVW.push(member.user.username);
                GVWString = GVW.join('\n');
                }
                console.log("récupération des membres")

                if (GVWString === '') {
                    GVWString = 'Aucun joueur inscrit';
                }

                return GVWString;
            });

        let embed = new EmbedBuilder()
            .setTitle('Bilan des inscriptions')
            .setDescription(`${GVWString}`)
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });

    }
}





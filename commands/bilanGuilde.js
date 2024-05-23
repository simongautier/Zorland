const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Client, GuildChannelManager, ChannelManager } = require('discord.js');
const GVW = require('./GVW');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilanguilde')
        .setDescription("Listing des joueurs de la guilde inscrits aux différentes activités"),
    async execute(interaction) {

        let GVO = [];
        let GVO_RES = [];
        let GVW = [];
        let GVOString = GVO.join('\n');
        let GVWString = GVW.join('\n');
        let GVO_RESString = GVO_RES.join('\n');

        await interaction.guild.members.fetch();
        await interaction.guild.members.cache.forEach(member => {
            if (member.roles.cache.some(role => role.name === 'GVO')) {
                GVO.push(member.user.username);
                GVOString = GVO.join('\n');
                }

                if (GVOString === '') {
                    GVOString = 'Aucun joueur inscrit';
                }

                return GVOString;
            });

            await interaction.guild.members.cache.forEach(member => {
                if (member.roles.cache.some(role => role.name === 'Guild War')) {
                    GVW.push(member.user.username);
                    GVWString = GVW.join('\n');
                    }
    
                    if (GVWString === '') {
                        GVWString = 'Aucun joueur inscrit';
                    }
    
                    return GVWString;
                });

            await interaction.guild.members.cache.forEach(member => {
                if (member.roles.cache.some(role => role.name === 'GVO_RES')) {
                    GVO_RES.push(member.user.username);
                    GVO_RESString = GVO_RES.join('\n');
                    }

    
                    if (GVO_RESString === '') {
                        GVO_RESString = 'Aucun joueur inscrit';
                    }
    
                    return GVO_RESString;
                });

                console.log('Demande de bilan de la guilde par    ' + interaction.user.username );

        let embed = new EmbedBuilder()
            .setTitle('Bilan des inscriptions')
            .addFields(
                { name: 'GVO', value: GVOString, inline: true },
                { name: 'GVW', value: GVWString, inline: true },                
                { name: 'GVO_RES', value: GVO_RESString },
            )
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });

    }
}





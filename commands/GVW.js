const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, messageLink, Message } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const { data } = require('./GVO');


module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('gvw')
        .setDescription(" inscritpion GVW"),

    async execute(interaction) {

        await interaction.deferReply();

        const button1 = new ButtonBuilder()
            .setCustomId('GVW_ON')
            .setLabel('Inscription GVW')
            .setStyle('1');

        const button2 = new ButtonBuilder()
            .setCustomId('GVW_OFF')
            .setLabel('désinscription GVW')
            .setStyle('2');

        const actionRow = new ActionRowBuilder()
            .addComponents(button1, button2);

    
        const explications = new EmbedBuilder()
            .setTitle('Inscriptionau prochaine siège')
            .setDescription('Cliquez sur le bouton correspondant à votre situation pour le prochain siège')
            .addFields(
                { name: 'Inscription', value: 'Vous vous inscrivez pour le prochaine siège', inline: false },
                { name: 'Désinscription', value: 'Vous vous désinscrivez du prochain siège', inline: false },
                { name: 'Réserviste', value: 'Vous vous mettez en réserve pour le prochain siège (inscrit mais remplaçable si besoin)', inline: false },
            )
            .setTimestamp();

        await interaction.editReply({embeds: [explications], components: [actionRow] });

        await interaction.client.on('interactionCreate', async interaction => {
            
            
            if (!interaction.isButton()) return;


            const member = interaction.member;
            const role = interaction.guild.roles.cache.find(role => role.name === 'Guild War');
            let content = '';
            const membername = member.user.username;

            if (interaction.customId === 'GVW_ON') {
                member.roles.add(role);
                console.log(membername + " s'est inscrit à la GVW")
                content = 'Vous êtes désormais inscrit pour la prochaine GVW'
            }
            else if (interaction.customId === 'GVW_OFF'){
                member.roles.remove(role) 
                console.log(membername + " s'est désinscrit de la GVW")
                content = 'Vous êtes désormais désinscrit de la prochaine GVW'
            }
            else {
                return;
            }

            await interaction.reply({ content, ephemeral: true})
            .then
            (setTimeout(() => {
                interaction.deleteReply()
            }, 3000))
            .catch(console.error)
            // await interaction.editReply({ content :'Ta réponse a bien été prise en compte'});
        });
    }
}


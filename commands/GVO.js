const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, messageLink, Message } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const { data } = require('./GVO');


module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('nextgvo')
        .setDescription(" inscritpion GVO"),

    async execute(interaction) {

        await interaction.deferReply();

        async function buttonCreate() {

            const button1 = new ButtonBuilder()
                .setCustomId('GVO_ON')
                .setLabel('Inscription GVO')
                .setStyle('1');
    
            const button2 = new ButtonBuilder()
                .setCustomId('GVO_OFF')
                .setLabel('désinscription GVO')
                .setStyle('2');
    
            const button3 = new ButtonBuilder() 
                .setCustomId('GVO_RES')
                .setLabel('Réserve GVO')
                .setStyle('3');

                if (interaction.member.roles.cache.some(role => role.name === 'GVO')) {
                    button3.setDisabled(true);
                }
                else if (interaction.member.roles.cache.some(role => role.name === 'GVO_RES')) {
                    button1.setDisabled(true);
                }
                else {
                    button2.setDisabled(true);
                }
    
            const actionRow = new ActionRowBuilder()
                .addComponents(button1, button2, button3);        
    
        const explications = new EmbedBuilder()
            .setTitle('Inscription à la prochaine GVO')
            .setDescription('Cliquez sur le bouton correspondant à votre situation pour la GVO')
            .addFields(
                { name: 'Inscription', value: 'Vous vous inscrivez pour le prochaine siège', inline: false },
                { name: 'Désinscription', value: 'Vous vous désinscrivez du prochain siège', inline: false },
                { name: 'Réserviste', value: 'Vous vous mettez en réserve pour le prochain siège (inscrit mais remplaçable si besoin)', inline: false },
            )
            .setTimestamp();

         return  interaction.editReply({embeds: [explications], components: [actionRow] });
        }

        await buttonCreate();
        await interaction.client.on('interactionCreate', async interaction => {        
            
            if (!interaction.isButton()) return;


            const member = interaction.member;
            const role = interaction.guild.roles.cache.find(role => role.name === 'GVO');
            const rolebench = interaction.guild.roles.cache.find(role => role.name === 'GVO_RES');
            let content = '';
            const membername = member.user.username;

            if (interaction.customId === 'GVO_ON') {
                member.roles.add(role);
                console.log(membername + " s'est inscrit à la GVO")
                content = 'Vous êtes désormais inscrit pour le prochain siège'
            }

            else if (interaction.customId === 'GVO_OFF'){
                member.roles.remove(role) && member.roles.remove(rolebench);
                console.log(membername + " s'est désinscrit de la GVO")
                content = 'Vous êtes désormais désinscrit du prochain siège'
            }

            else if (interaction.customId === 'GVO_RES'){
                member.roles.add(rolebench);
                console.log(membername + " est sur la réserve de la GVO")
                content = 'Vous vous mettez en réserve pour le prochain siège'
            }
            else {
                return;
            }

            
                }
    );
    }
}


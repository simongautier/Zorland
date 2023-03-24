const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Affiche l'aide du bot :"),
	async execute(interaction) {
        //ouvre help.txt et l'envoie dans le channel
        //faire un embed avec les commandes et leur description
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('📖 Liste des commandes 📖')
        .setDescription('Voici la liste des commandes du bot :')
        .addFields(
            { name: '/help', value: 'Affiche l\'aide du bot' },
            { name: '/clear', value: 'Efface les messages du channel' },
            { name: '/bilangvw', value: 'Affiche la liste des joueurs inscrits aux GVW' },
            { name: '/bilangvo', value: 'Affiche la liste des joueurs inscrits aux GVO' },
            { name: '/gvw', value: 'Permets de s\'inscrire aux GVW' },
            { name: '/gvo', value: 'Permets de s\'inscrire aux GVO' },
            { name: '/swarfarm', value: 'Affiche les stats d\'un monstre sur swarfarm (en cours de développement) \n Exemple : /swarfarm name:chandra owner:simotre' }
        )
        .setTimestamp()
        .setImage("https://cdn.discordapp.com/icons/1087384979371212820/3bfaa0d053a1702f425a33671d6e1233.webp?size=128")

        await interaction.reply({ embeds: [embed] });
        },
};

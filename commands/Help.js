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
            { name: 'bilanguilde', value: 'Affiche la liste des joueurs de la guilde et ce dans quoi ils sont inscits ou non' },
            { name: '/nextgvo', value: 'Affiche la liste des joueurs inscrits auxprochains sièges' },
            { name: '/nextgvw', value: 'Affiche la liste des joueurs inscrits aux prochaines gvw' },
            { name: '/swarfarm', value: 'Affiche les stats d\'un monstre sur swarfarm \n Exemple : /swarfarm name:chandra owner:simotre' },
            { name: '/play <value>', value: 'Joue la musique demandée (recherche sur youtube la première musique de la recherche... faut etre un minimum précis' },
            { name: '/disconnect', value: 'déconnecte le bot du salon' },
            { name: '/next', value: 'Skip la musique en cours' },
            { name: '/pause', value: 'Met en pause la musique en cours' },
            { name: '/unpause', value: 'Reprend la musique en cours' },
            { name: '/queue', value: 'Affiche la liste des musiques en cours' },
            { name: '/add <value>', value: 'Permets d\'ajouter une musique à la playlist' },
            { name: 'Pour éviter le crash', value: 'merci de join un salon vocal avant d\'utiliser la commande /music play' },
            { name: 'NOTE IMPORTANTE', value: 'Bot en cours de développement, merci de me faire parvenir en MP les bugs rencontrés / crash ! Merci !!' },
        )
        .setTimestamp()
        .setImage("https://cdn.discordapp.com/icons/1087384979371212820/3bfaa0d053a1702f425a33671d6e1233.webp?size=128")

        await interaction.reply({ embeds: [embed] });
        },
};

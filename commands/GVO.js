const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, messageLink, Message } = require('discord.js');


module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('gvo')
        .setDescription(" inscritpion GVO"),

    async execute(interaction) {

        await interaction.deferReply();

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
            .setLabel('Réserviste GVO')
            .setStyle('1');

        const actionRow = new ActionRowBuilder()
            .addComponents(button1, button2, button3);

    
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
            const role = interaction.guild.roles.cache.find(role => role.name === 'GVO');
            const roleReserve = interaction.guild.roles.cache.find(role => role.name === 'GVO_RES');
            let content = '';
            const membername = member.user.username;

            if (interaction.customId === 'GVO_ON') {
                member.roles.add(role);
                console.log(membername + " s'est inscrit à la GVO")
                content = 'Vous êtes désormais inscrit pour la prochaine GVO'
            }
            else if (interaction.customId === 'GVO_OFF'){
                member.roles.remove(role) 
                member.roles.remove(roleReserve)
                console.log(membername + " s'est désinscrit de la GVO")
                content = 'Vous êtes désormais désinscrit de la prochaine GVO'
            }
            else if (interaction.customId === 'GVO_RES'){
                member.roles.add(roleReserve) 
                console.log(membername + " s'est inscrit en tant que réserviste à la GVO")
                content = 'Vous êtes désormais réserviste pour la prochaine GVO'
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


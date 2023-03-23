const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, messageLink, Message } = require('discord.js');
const fs = require('fs');


async function editMessage(message, interaction, GVW) {
    await interaction.guild.members.fetch();
    console.log(await interaction.guild.members.fetch())
    let GVWString = '';
    await interaction.guild.members.cache.forEach(member => {

        if (member.roles.cache.some(role => role.name === 'gvgworld')) {
            GVW.push(member.user.username);
        }


    });
    GVWString = GVW.join('\n');

    if (GVWString === '') {
        GVWString = 'Aucun joueur inscrit';
    }
    let embed = new EmbedBuilder()
        .setTitle('Bilan des inscriptions')
        .setDescription(`${GVWString}`)
        .setTimestamp()

    await message.edit({ embeds: [embed] })
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gvw')
        .setDescription("Listing des joueurs de la guilde inscrits aux différentes activités"),
    async execute(interaction) {

        let GVW = [];
        let LastMessage = await interaction.channel.messages.fetch({ limit: 1 })
        let message = LastMessage.first();

        const button1 = new ButtonBuilder()
            .setCustomId('GVW_ON')
            .setLabel('Inscription GVW')
            .setStyle('3');

        const button2 = new ButtonBuilder()
            .setCustomId('GVW_OFF')
            .setLabel('désinscription GVW')
            .setStyle('4');

        const actionRow = new ActionRowBuilder()
            .addComponents(button1, button2);

        await interaction.reply({ content: '', components: [actionRow] });

        await interaction.client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            GVW = [];
            const member = interaction.member;
            const role = interaction.guild.roles.cache.find(role => role.name === 'gvgworld');
            content = '';
            if (interaction.customId === 'GVW_ON') {
                member.roles.add(role);
                content = 'Vous êtes désormais inscrit à la GVW';
            }
            else if (interaction.customId === 'GVW_OFF'){
                member.roles.remove(role);
                content = 'Vous êtes désormais désinscrit de la GVW';
            }
            else {
                return;
            }

            await interaction.reply({ content , ephemeral: true, deleteAfter: 10 })
                .then
                (setTimeout(() => {
                    interaction.deleteReply()
                }, 3000))
                .catch(console.error)


            editMessage(message, interaction, GVW);
        });
    }
}

const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, messageLink, Message } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const fs = require('fs');


async function editMessage(message, interaction, GVO) {
    await interaction.guild.members.fetch();
    let GVOString = '';
    await interaction.guild.members.cache.forEach(member => {

        if (member.roles.cache.some(role => role.name === 'gvo')) {
            GVO.push(member.user.username);
            GVOString = GVO.join('\n');
        }
        if (GVOString === '') {
            GVOString = 'Aucun joueur inscrit';
        }

    });
    let embed = new EmbedBuilder()
        .setTitle('Bilan des inscriptions')
        .setDescription(`${GVOString}`)
        .setTimestamp()

    await message.edit({ embeds: [embed] })
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gvo')
        .setDescription("Listing des joueurs de la guilde inscrits aux différentes activités"),
    async execute(interaction) {

        let GVO = [];
        let LastMessage = await interaction.channel.messages.fetch({ limit: 1 })
        let message = LastMessage.first();

        const button3 = new ButtonBuilder()
            .setCustomId('GVO_ON')
            .setLabel('Inscription GVO')
            .setStyle('3');

        const button4 = new ButtonBuilder()
            .setCustomId('GVO_OFF')
            .setLabel('désinscription GVO')
            .setStyle('4');

        const actionRow = new ActionRowBuilder()
            .addComponents(button3, button4);

        await interaction.reply({ content: '', components: [actionRow] });

        await interaction.client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            GVO = [];
            const member = interaction.member;
            const role = interaction.guild.roles.cache.find(role => role.name === 'gvo');
            let content = '';
            const membername = member.user.username;

            if (interaction.customId === 'GVO_ON') {
                member.roles.add(role);
                console.log(membername + " s'est inscrit à la GVO")
                content = 'Vous êtes désormais inscrit à la GVO'
            }
            else if (interaction.customId === 'GVO_OFF'){
                member.roles.remove(role);
                console.log(membername + " s'est désinscrit de la GVO")
                content = 'Vous êtes désormais désinscrit de la GVO'
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


            editMessage(message, interaction, GVO)
        });

    }
};




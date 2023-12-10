const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { exec } = require("child_process");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminders')
        .setDescription('Active les Rappels')
        .setStringOption(option => option.setName('reminders').setDescription('Active les Rappels').setRequired(true)),


    async execute(interaction) {

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Rappels')
            .setDescription('Les rappels GVO / GVW / Laby et Subjugation sont activés !')
            .setTimestamp()
            .setFooter('Rappels');

        //launch .sh script

        if (interaction.options.getString('reminders') == "on") {
            exec("sh ./scripts/activateReminder.sh")
        }
        else if (interaction.options.getString('reminders') == "off") {
            exec("sh ./scripts/cancelReminder.sh")
        }
        else {
            console.log("error")
            await interaction.reply({ content: "Invalid Option", ephemeral: true });
        }
        
        await interaction.reply({ embeds: [embed] });
    }
};


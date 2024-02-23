const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { exec } = require("child_process");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminders')
        .setDescription('Active les Rappels')
        .addStringOption(option => option.setName('reminders').setDescription('Activer ou désactiver les rappels').setRequired(true)),


    async execute(interaction) {

        await interaction.deferReply();

        if (reminders === 'on') {
            exec(exec ('sh ../scripts/activateReminder.sh'));
            await interaction.reply('Les rappels sont activés');
        }

        if (reminders === 'off') {
            exec(exec ('sh ../scripts/cancelReminder.sh'));
            await interaction.reply('Les rappels sont désactivés');
        }
    }
}

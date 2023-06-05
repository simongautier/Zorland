const { schedule } = require('node-cron');
const { SlashCommandBuilder, userMention, roleMention } = require('@discordjs/builders');
const { EqualizerCoefficients } = require('@discord-player/equalizer');


async function reminderGVO (interaction) {
    var messageGVO = "La GVO a commencé, merci de ne pas oublier vos combats ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageGVO + roleMention('1088104034596036659'));
}

async function reminderLaby (interaction) {
    var messageLaby = "Le Labyrinthe a reset, merci de suivre les cibles des leads et de taper en Hell en priorité. \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageLaby + roleMention('1088104034596036659'));
}

async function ReminderGVW(interaction) {
    var messageGVW = "La combat de Guilde World est ouvert, pensez à vos combats ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageGVW + roleMention(""));
}

async function reminderSlime(interaction) {
    var messageslime = "Les sbires du roi des Slimes sont apparus cette nuit, pensez à les taper ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageslime + roleMention('1088104034596036659'));
}

async function reminderSlimeTwo(interaction) {
    var messageSlimeTwo = " Le roi est apparu, pensez à le taper ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageSlimeTwo + roleMention('1088104034596036659'));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remindgvo')
        .setDescription('Reminder for GVO'),

    async execute(interaction) {
        interaction.deferReply();

    let DayChecker = 0;
        
    schedule('0 12 * * MON,TUE,THU,FRI', () => {
        reminderGVO(interaction);
        });
    
    schedule('0 6 * * 6', () => {
        if (DayChecker === 0) {
            DayChecker = 1;
        }
        else {
        reminderLaby(interaction);
        DayChecker = 0;
        }
        });
    
    schedule('0 9 * * WED,FRI', () => {
        ReminderGVW(interaction);
        });

    schedule('0 8 * * 1', () => {
        reminderSlime(interaction);
        });
    
    schedule('0 16 * * 1', () => {
        reminderSlimeTwo(interaction);
        });    
    }
};
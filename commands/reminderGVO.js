const { schedule } = require('node-cron');
const { SlashCommandBuilder, roleMention } = require('@discordjs/builders');


async function reminderGVO (interaction) {
    var messageGVO = "La GVO a commencé, merci de ne pas oublier vos combats ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageGVO + roleMention('1087408574365446174'));
}

async function reminderLaby (interaction) {
    var messageLaby = "Le Labyrinthe a reset, merci de suivre les cibles des leads et de taper en Hell en priorité. \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageLaby + roleMention('1087399168349315182'));
}

async function ReminderGVW(interaction) {
    var messageGVW = "La combat de Guilde World est ouvert, pensez à vos combats ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageGVW + roleMention("1087408484368257084"));
}

async function reminderSlime(interaction) {
    var messageslime = "Les sbires du roi des Slimes sont apparus cette nuit, pensez à les taper ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageslime + roleMention('1087399168349315182'));
}

async function reminderSlimeTwo(interaction) {
    var messageSlimeTwo = " Le roi est apparu, pensez à le taper ! \nBonne chance et bon courage à tous ! \n\n"
    await interaction.channel.send(messageSlimeTwo + roleMention('1183531616971264150'));
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

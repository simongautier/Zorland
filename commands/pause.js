const { SlashCommandBuilder, VoiceChannel } = require('discord.js');
const { Player, VoiceUtils, GuildQueue } = require('discord-player');
const config = require('../config.json');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause la musique dans un channel vocal'),

        async execute(interaction) {
            const channel = interaction.member.voice.channel.id;
            if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel

            const player = interaction.client.player;
            
            console.log(player)
        
            // let's defer the interaction as things can take time to process
            await interaction.deferReply();            
            const playertest = player; // get the player from the client

         
                return interaction.followUp(`**${track.title}** enqueued!`);
        }
    }




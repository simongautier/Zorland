const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior} = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { usePlayer } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Play a song in a voice channel')
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Play a song in a voice channel')
                .addStringOption(option =>
                    option.setName('song')
                        .setDescription('The song you want to play')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Pause the song in a voice channel'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Resume the song in a voice channel'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Stop the song in a voice channel')),
    
        async execute(interaction) {


            const player = createAudioPlayer(
                {
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                }
            );

            const channel = interaction.member.voice.channel.id;
            if (!channel) return await interaction.reply('You are not connected to a voice channel!');
            const connection = joinVoiceChannel({
                channelId: channel,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });

            const resource = createAudioResource(`./commands/assets/music.mp3`, { inlineVolume: true });
            connection.subscribe(player);


            const subcommand = interaction.options.getSubcommand();

            if (subcommand === 'play') {
                const song = interaction.options.getString('song');


                if (!channel) return await interaction.reply('You are not connected to a voice channel!');
                const connection = joinVoiceChannel({
                    channelId: channel,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                    selfDeaf: false,
                    selfMute: false
                });
                player.play(resource);
                await interaction.reply('Playing music in your voice channel!');
            }
            else if (subcommand === 'pause') {
                player.pause();
                await interaction.reply('Pausing music ');
            }
            else if (subcommand === 'resume') {
                player.unpause();
                await interaction.reply('Resuming music');
            }
            else if (subcommand === 'stop') {
                player.stop();
                await interaction.reply('Stopping music');
            }       
           
            player.on('stateChange', (oldState, newState) => {
                console.log(`Player transitioned from ${oldState.status} to ${newState.status}`);
            });
            player.on('error', error => {
                console.error('Error:', error.message);
            });


        }
    }
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior} = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

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
                        .setRequired(true)))
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


            const player = createAudioPlayer();

            const channel = interaction.member.voice.channel.id;
            if (!channel) return await interaction.reply('You are not connected to a voice channel!');
            const connection = joinVoiceChannel({
                channelId: channel,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });


            let resource = createAudioResource(`./commands/assets/music.mp3`, { inlineVolume: true });
            connection.subscribe(player);

            let Playlist = new Playlist();

            const subcommand = interaction.options.getSubcommand();

            if (subcommand === 'play') {
                const song = interaction.options.getString('song');
                if (!song)  return await interaction.reply('You need to specify a song!');
                else (
                    resource = createAudioResource(ytdl(song, { filter: 'audioonly' }), { inlineVolume: true })
                )

                if (!channel) return await interaction.reply('You are not connected to a voice channel!');
                const connection = joinVoiceChannel({
                    channelId: channel,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                    selfDeaf: false,
                    selfMute: false
                });
                resource.volume.setVolume(0.2);
                player.play(resource);
                await interaction.reply('Playing music in your voice channel!');
            }
            else if (subcommand === 'pause') {
                player.pause();
                await interaction.reply('Pausing music ');
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
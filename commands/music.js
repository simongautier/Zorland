const { SlashCommandBuilder, hideLinkEmbed } = require('@discordjs/builders');
const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource, subscribe, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const ConfigJSON = require('../config.json');
const ytdl = require('ytdl-core');
const playdl = require('play-dl');
const ytsr = require('ytsr');
const { EmbedBuilder } = require('discord.js');
const { Stream } = require('stream');
const { type } = require('os');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Play a song in a voice channel')
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Play a song in a voice channel')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('The song you want to play')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Stop the music and leave the voice channel'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Resume the music in the voice channel'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Stop the music and leave the voice channel')),


    async execute(interaction) {

        const subcommand = interaction.options.getSubcommand();


        const YTapiKey = ConfigJSON.YoutubeAPIKey;

        const player = new createAudioPlayer(
            {
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play,
                },
            }
        );

        if (subcommand === 'play') {

            interaction.deferReply();
            const query = interaction.options.getString('query');

            const queryResult = await ytsr(query);
            const Finalquery = String( await queryResult.items[0].url);
            const streamplay = await playdl.stream(Finalquery, {number: 3, boolean:false});
            const connection = new joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: false,
            });

            connection.subscribe(player);
            console.log(streamplay.stream);
            const resource = createAudioResource(streamplay.stream, { inputType: streamplay.type });


            let embed = new EmbedBuilder()
                .setTitle(queryResult.items[0].title)
                .setURL(queryResult.items[0].url)
                .setThumbnail(String(queryResult.items[0].bestThumbnail.url))
                .setDescription("Currently playing ....")
                .setFooter({text:"Requested by " + interaction.user.username, iconURL:interaction.user.avatarURL()})
                .setTimestamp()
                .setColor(0x00AE86)

            player.play(resource);

            await interaction.editReply({ embeds: [embed] });
            const voiceplayer = getVoiceConnection(interaction.guild.id);
            console.log(voiceplayer);
        }

        if (subcommand === 'pause') {
            console.log("pause");
            console.log(player);
            await player.pause();
            player.on('error', (error) => {
                console.log(error);
            });
        }
        if (subcommand === 'resume') {
            console.log("resume");
            console.log(player.state.status);
        }
        if (subcommand === 'stop') {
            console.log("stop");
            console.log(player.state.status);
        }
        player.on('stateChange', (oldState, newState) => {
            console.log(oldState.status, newState.status);
        });
    }   
}
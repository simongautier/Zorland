const { SlashCommandBuilder, hideLinkEmbed } = require('@discordjs/builders');
const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource, subscribe, VoiceConnectionStatus } = require('@discordjs/voice');
const ConfigJSON = require('../config.json');
const search = require('youtube-search');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { EmbedBuilder } = require('discord.js');



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

        const player = new createAudioPlayer(
            {
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play,
                },
            }
        );
        const YTapiKey = ConfigJSON.YoutubeAPIKey;

        interaction.deferReply();

        if (subcommand === 'play') {


            const query = interaction.options.getString('query');


            const opts = {
                maxResults: 1,
                key: YTapiKey,

            }

            const queryResult = await ytsr(query);

            console.log(String(queryResult.items[0].bestThumbnail));

            console.log(queryResult.items[0].thumbnails);

            const Finalquery = String(queryResult.items[0].url);
            const stream = ytdl(String(Finalquery), { filter: 'audioonly' });
            // console.log(await ytdl.getInfo("https://www.youtube.com/watch?v=U41bONK2V-U"));

            const connection = new joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: false,
            });

            const subscription = connection.subscribe(player);
            const resource = createAudioResource(stream, { inlineVolume: true });
            resource.volume.setVolume(0.2); 
            player.play(resource);

            const embed = new EmbedBuilder()
                .setTitle(queryResult.items[0].title)
                .setURL(queryResult.items[0].url)
                .setThumbnail(String(queryResult.items[0].bestThumbnail.url))
                .setDescription("Currently playing ....")
                .setFooter({text:"Requested by " + interaction.user.username, iconURL:interaction.user.avatarURL()})
                .setTimestamp()
                .setColor(0x00AE86)


            await interaction.editReply({ embeds: [embed] });
        }

        if (subcommand === 'pause') {
            player.pause();
            await interaction.editReply('Pausing music');
        }
        if (subcommand === 'resume') {
            player.unpause();
            await interaction.editReply('Resuming music');
        }
        if (subcommand === 'stop') {
            player.stop();
            await interaction.editReply('Stopping music');
        }

    }   
}
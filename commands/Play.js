const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource, subscribe, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const ConfigJSON = require('../config.json');
const playdl = require('play-dl');
const {getNextVerif} = require('./Next.js');
const ytsr = require('ytsr');
const { EmbedBuilder } = require('discord.js');

function Audiocreate() {
    const player = new createAudioPlayer(
        {
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        }
    );
    return player;
}

async function createResourceToplay(Request) {
    const queryResult = await ytsr(Request);
    const Finalquery = String(await queryResult.items[0].url);
    const stream = await playdl.stream(Finalquery, { highWaterMark: 1 << 25 });
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    return resource;
    
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song in a voice channel')
        .addStringOption(option => option.setName('query').setDescription('The song you want to play').setRequired(true)),


    async execute(interaction) {

        const GetVerif = interaction.member.voice.channel;

        if (!GetVerif) {
            await interaction.reply('You need to be in a voice channel to play music!');
            return;
        }

        const player = Audiocreate();

        interaction.deferReply();
        const query = interaction.options.getString('query');
        const queryResult = await ytsr(query);
        const Finalquery = String(await queryResult.items[0].url);

        const connection = new joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false,
        });

        const resource = await createResourceToplay(Finalquery);

        let embed = new EmbedBuilder()
            .setTitle(queryResult.items[0].title)
            .setURL(queryResult.items[0].url)
            .setThumbnail(String(queryResult.items[0].bestThumbnail.url))
            .setDescription("Currently playing ....")
            .setFooter({ text: "Requested by " + interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
            .setColor(0x00AE86)

        player.play(resource);
        const subscribed = connection.subscribe(player);
        console.log(subscribed);


        await interaction.editReply({ embeds: [embed] });
        const voiceplayer = getVoiceConnection(interaction.guild.id);
        console.log(player.state.status);


    },
};
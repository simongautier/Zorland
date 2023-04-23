const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { getLastRequest } = require('./Add.js');
const ytsr = require('ytsr');
const playdl = require('play-dl');


async function createResourceToplay(Request) {
    const queryResult = await ytsr(Request);
    const Finalquery = String(await queryResult.items[0].url);
    const stream = await playdl.stream(Finalquery, { highWaterMark: 1 << 25 });
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    return resource;
    
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('Skip the current song'),

    async execute(interaction) {

        interaction.deferReply();

        const connection = getVoiceConnection(interaction.guildId);
        const player = connection.state.subscription.player;
        const toPlay = getLastRequest();
        if (!toPlay) {
            return interaction.editReply({ content: "No more songs in the queue !" });
        }
        const resource = await createResourceToplay(toPlay);
            player.play(resource);
            interaction.editReply({ content: "Playing next song !" });
    },
};
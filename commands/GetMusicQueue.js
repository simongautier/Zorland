const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue } = require('../commands/Add.js');
const { EmbedBuilder } = require('discord.js');
const ytsr = require('ytsr');
const { join } = require('path');
const { listenerCount } = require('process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Get the music queue'),

    async execute(interaction) {
    
        interaction.deferReply();

        const queue = getQueue();
        console.log(queue);
        Liste = [];

        for (let i = 0; i < queue.length; i++) {
            const request = await ytsr(queue[i]);
            const title = String(await request.items[0].title);
            Liste.push(title);
        }

        // async function createResourceToplay(Request) {
        //     const queryResult = await ytsr(Request);
        //     const Finalquery = String(await queryResult.items[0].url);
        //     const stream = await playdl.stream(Finalquery, { highWaterMark: 1 << 25 });
        //     const resource = createAudioResource(stream.stream, { inputType: stream.type });
        //     return resource;
            
        // }

        const finalListe = Liste.join('\n');

        const embed = new EmbedBuilder()
            .setTitle('Music Queue')
            .setDescription(finalListe)
            .setColor(0x00AE86)

        await interaction.editReply({ embeds: [embed] });
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');


const queue = [];




module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a song to the queue')
        .addStringOption(option => option.setName('add').setDescription('The song you want to add').setRequired(true)),

    async execute(interaction) {

        const GetVerif = interaction.member.voice.channel;
        if (!GetVerif) {
            await interaction.reply('Merci de rejoindre un salon vocal pour utiliser cette commande !');
            return;
        }

        const addRequest = interaction.options.getString('add');
        queue.push(addRequest);
        await interaction.reply({ content: "Added to the queue !" });
    },

    getLastRequest: function () {
        console.log(queue);
        return queue.shift();
    },

    getQueue: function () {
        console.log(queue);
        return queue;
    }
};

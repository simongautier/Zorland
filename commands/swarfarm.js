const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const json = require('../config.json');
const fetch = require('node-fetch');

async function getPage(url) {
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            "X-Csrftoken": "vNPF8DuKt4JkYxrnBC7dR0G59bVm5FJo8mMzFAiz0c3eUFwT9rqRuvhCY2S9C9gJ"
        }
    })
    return response.json();
}

async function getImage(response) {
    let monsterId = response.results[0].monster;
    let url = `https://swarfarm.com/api/v2/monsters/${monsterId}/`;
    let response2 = await getPage(url);
    let image = `./commands/assets/monsters/${response2.image_filename}`;
    return image;
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('swarfarm')
        .setDescription('Clears messages.')
        .addStringOption(option => option.setName('name').setDescription('The name of the monster').setRequired(true))
        .addStringOption(option => option.setName('owner').setDescription('The owner of the monster').setRequired(true)),


    async execute(interaction) {

        await interaction.deferReply();

        const name = interaction.options.getString('name');
        const owner = interaction.options.getString('owner');

        url = `https://swarfarm.com/api/v2/profiles/${owner}/monsters/?monster__name=${name}`;

        const content = await getPage(url);

        console.log(content);
        if (content.detail == "Not found." || content.count == 0) {
            return await interaction.reply("Le monstre n'a pas été trouvé", ephemral = true);
        }
        let nbrMonsters = content.count;

        const listEmbed = [];

        const test = await getImage(content);
        const imageMonster = new AttachmentBuilder(test, { name: 'image.png' });

        for (let i = 0; i < nbrMonsters; i++) {

            const total_ATK = content.results[i].rune_attack + content.results[i].base_attack;
            const total_DEF = content.results[i].rune_defense + content.results[i].base_defense;
            const total_HP = content.results[i].rune_hp + content.results[i].base_hp;
            const total_SPD = content.results[i].rune_speed + content.results[i].base_speed;
            const total_TC = content.results[i].rune_crit_rate + content.results[i].base_crit_rate;
            const total_DC = content.results[i].rune_crit_damage + content.results[i].base_crit_damage;
            const total_RES = content.results[i].rune_resistance + content.results[i].base_resistance;
            const total_ACC = content.results[i].rune_accuracy + content.results[i].base_accuracy;

            const embed = new EmbedBuilder()
                .setTitle(`${name.toUpperCase()}`)
                .setDescription(`De ${owner}`)
                .setColor(0x206694)
                .setThumbnail(`attachment://image.png`)
                .addFields({
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'HP',
                    value: String(total_HP) + " (+ " + String(content.results[i].rune_hp) + ")",
                    inline: true,
                    color: 0x00ff00,
                }, {
                    name: 'Crit. Rate',
                    value: String(total_TC) + " (+ " + String(content.results[i].rune_crit_rate) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'ATK',
                    value: String(total_ATK) + " (+ " + String(content.results[i].rune_attack) + ")",
                    inline: true,
                }, {
                    name: 'Crit. Damage',
                    value: String(total_DC) + " (+ " + String(content.results[i].rune_crit_damage) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'DEF',
                    value: String(total_DEF) + " (+ " + String(content.results[i].rune_defense) + ")",
                    inline: true,
                }, {
                    name: 'Résistance',
                    value: String(total_RES) + " (+ " + String(content.results[i].rune_resistance) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'Speed',
                    value: String(total_SPD) + " (+ " + String(content.results[i].rune_speed) + ")",
                    inline: true,
                }, {
                    name: 'Précision',
                    value: String(total_ACC) + " (+ " + String(content.results[i].rune_accuracy) + ")",
                    inline: true,
                })

            listEmbed.push(embed);
        }
        await interaction.editReply({ embeds: listEmbed, files: [imageMonster] });
    }
}
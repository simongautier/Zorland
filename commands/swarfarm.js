const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const json = require('../config.json');
const fetch = require('node-fetch');
const runeType = require('../commands/assets/Runes_Type.json');

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
    let monsterId = response;
    let url = `https://swarfarm.com/api/v2/monsters/${monsterId}/`;
    let response2 = await getPage(url);
    let image = `./commands/assets/monsters/${response2.image_filename}`;
    return image;
}

const toUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function formattingName(name) {
    
    if (name === name.toLowerCase()) {
        return toUpperCase(name);
    }
    if (name === toUpperCase(name)) {
        return name.toLowerCase();
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('swarfarm')
        .setDescription('Voir les infos d\'un monstre d\'un invocateur référencé dans Swarfarm')
        .addStringOption(option => option.setName('name').setDescription('The name of the monster').setRequired(true))
        .addStringOption(option => option.setName('owner').setDescription('The owner of the monster').setRequired(true)),


    async execute(interaction) {

        await interaction.deferReply();


        const name = interaction.options.getString('name');
        const owner = interaction.options.getString('owner');

        const membername = interaction.member.user.username;

        url = `https://swarfarm.com/api/v2/profiles/${owner}/monsters/?monster__name=${name}`;

        let content = await getPage(url);

        if (content.detail == "Not found." || content.count == 0) {

            content = await getPage(`https://swarfarm.com/api/v2/profiles/${formattingName(owner)}/monsters/?monster__name=${name}`);

             
            if(fetch(`https://swarfarm.com/api/v2/profiles/${formattingName(owner)}/monsters/?monster__name=${name}`).response != 200 || content.detail == "Not found." || content.count == 0) {
            await interaction.editReply("Le monstre n'a pas été trouvé", ephemral = true);
            return;
            }
        }


        let nbrMonsters = content.count;

        const listEmbed = [];
        const listImg = [];

        for (let i = 0; i < nbrMonsters; i++) {

            const test = await getImage(content.results[i].monster);
            const imageMonster = new AttachmentBuilder(test, { name: 'image' + String(i) + '.png' });

            const total_ATK = content.results[i].rune_attack + content.results[i].base_attack;
            const total_DEF = content.results[i].rune_defense + content.results[i].base_defense;
            const total_HP = content.results[i].rune_hp + content.results[i].base_hp;
            const total_SPD = content.results[i].rune_speed + content.results[i].base_speed;
            const total_TC = content.results[i].rune_crit_rate + content.results[i].base_crit_rate;
            const total_DC = content.results[i].rune_crit_damage + content.results[i].base_crit_damage;
            const total_RES = content.results[i].rune_resistance + content.results[i].base_resistance;
            const total_ACC = content.results[i].rune_accuracy + content.results[i].base_accuracy;

            const runeSet = content.results[i].default_build;

            const occurence  = runeSet.runes.reduce((acc, rune) => {
                const type = rune.type
                if (!(type in acc)) {
                    acc[type] = 1
                }  else {
                    acc[type] += 1
                }
                return acc;
            }, {})

            const runeSetmonster = Object.entries(occurence)

            const listSet = [];

            for (let j = 0; j < runeSetmonster.length; j++) {
                const typeRune = runeSetmonster[j][0];
                const runeOccurence = runeSetmonster[j][1];
                const verif = runeType.find(elt => elt.type == typeRune)

                if (runeOccurence >= verif.SetNbr) {
                    listSet.push(verif.name);  
                }
              
            }

            const embed = new EmbedBuilder()
                .setTitle(`${name.toUpperCase()}`)
                .setDescription(`De ${owner}`)
                .setColor(0x206694)
                .setThumbnail(`attachment://` + 'image' + String(i) + '.png')
                .addFields({
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
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'Rune Set',
                    value: listSet.length == 0 ? "Pas de set" : listSet.join(', '),

                })
            listImg.push(imageMonster);
            listEmbed.push(embed);
        }

        await interaction.editReply({ embeds: listEmbed, files: listImg });
    }
}
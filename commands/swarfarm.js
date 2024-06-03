const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const json = require('../config.json');
const fetch = require('node-fetch');
const runeType = require('../commands/assets/Runes_Type.json');
const math = require('mathjs');




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

        let url = `https://swarfarm.com/api/v2/profiles/${owner}/monsters/?monster__name=${name}`;

        async function getPage(url) {
    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "X-Csrftoken": "vNPF8DuKt4JkYxrnBC7dR0G59bVm5FJo8mMzFAiz0c3eUFwT9rqRuvhCY2S9C9gJ"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération de la page:', error);
        return { detail: 'Not found.' };
    }
}


        content = await getPage(url);

        if (content.detail == "Not found." || content.count == 0) {
             
            if(fetch(`https://swarfarm.com/api/v2/profiles/${formattingName(owner)}/monsters/?monster__name=${name}`).response != 200 || content.detail == "Not found." || content.count == 0) {
                await interaction.editReply({ content: "Le monstre n'a pas été trouvé", ephemeral: true });
                return;
            }
        }


        let nbrMonsters = content.count;

        const listEmbed = [];
        const listImg = [];
        let rta_hp, rta_attack, rta_defense, rta_speed, rta_crit_rate, rta_crit_damage, rta_resistance, rta_accuracy;

        for (let i = 0; i < nbrMonsters; i++) {

            const test = await getImage(content.results[i].monster);
            const imageMonster = new AttachmentBuilder(test, { name: 'image' + String(i) + '.png' });


            const base_attack =  content.results[i].base_attack;
            const base_defense =  content.results[i].base_defense;
            const base_hp = content.results[i].base_hp;
            const base_speed = content.results[i].base_crit_rate;
            const base_crit_rate = content.results[i].base_crit_rate;
            const base_crit_damage = content.results[i].base_crit_damage;
            const base_resistance = content.results[i].base_resistance;
            const base_accuracy = content.results[i].base_accuracy;


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


            console.log(content.results[i].rta_build);

            const embed = new EmbedBuilder()
                .setTitle(`${name.toUpperCase()}`)
                .setDescription(`De ${owner}`)
                .setColor(0x206694)
                .setThumbnail(`attachment://` + 'image' + String(i) + '.png')
                .addFields({
                    name: 'HP',
                    value: String(content.results[i].base_hp) + " (+ " + String(content.results[i].rune_hp) + ")",
                    inline: true,
                    color: 0x00ff00,
                }, {
                    name: 'Crit. Rate',
                    value: String(content.results[i].base_crit_rate) + " (+ " + String(content.results[i].rune_crit_rate) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'ATK',
                    value: String(content.results[i].base_attack) + " (+ " + String(content.results[i].rune_attack) + ")",
                    inline: true,
                }, {
                    name: 'Crit. Damage',
                    value: String(content.results[i].base_crit_damage) + " (+ " + String(content.results[i].rune_crit_damage) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'DEF',
                    value: String(content.results[i].base_defense) + " (+ " + String(content.results[i].rune_defense) + ")",
                    inline: true,
                }, {
                    name: 'Résistance',
                    value: String(content.results[i].base_resistance) + " (+ " + String(content.results[i].rune_resistance) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'Speed',
                    value: String(content.results[i].base_speed) + " (+ " + String(content.results[i].rune_speed) + ")",
                    inline: true,
                }, {
                    name: 'Précision',
                    value: String(content.results[i].base_accuracy) + " (+ " + String(content.results[i].rune_accuracy) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'Rune Set',
                    value: listSet.length == 0 ? "Pas de set" : listSet.join(', '),

                })


                const rta_hp = math.round((((base_hp * content.results[i].rta_build.hp_pct) / 100) + content.results[i].rta_build.hp));
                const rta_attack = math.round((((base_attack * content.results[i].rta_build.attack_pct) / 100) + content.results[i].rta_build.attack));
                const rta_defense = math.round((((base_defense * content.results[i].rta_build.defense_pct) / 100) + content.results[i].rta_build.defense));
                const rta_speed = math.round((((base_speed * content.results[i].rta_build.speed_pct) / 100) + content.results[i].rta_build.speed));
                const rta_crit_rate = content.results[i].rta_build.crit_rate;
                const rta_crit_damage =  content.results[i].rta_build.crit_damage;
                const rta_resistance =  content.results[i].rta_build.resistance;
                const rta_accuracy =  content.results[i].rta_build.accuracy;

            const embedRTA = new EmbedBuilder()
            .setTitle(`RTA`)
                .setColor(0x206694)
                .setThumbnail(`attachment://` + 'image' + String(i) + '.png')
                .addFields({
                    name: 'HP',
                    value: String(content.results[i].base_hp) + " (+ " + String(rta_hp) + ")",
                    inline: true,
                    color: 0x00ff00,
                }, {
                    name: 'Crit. Rate',
                    value: String(content.results[i].base_crit_rate) + " (+ " + String(rta_crit_rate) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'ATK',
                    value: String(content.results[i].base_attack) + " (+ " + String(rta_attack) + ")",
                    inline: true,
                }, {
                    name: 'Crit. Damage',
                    value: String(content.results[i].base_crit_damage) + " (+ " + String(rta_crit_damage) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'DEF',
                    value: String(content.results[i].base_defense) + " (+ " + String(rta_defense) + ")",
                    inline: true,
                }, {
                    name: 'Résistance',
                    value: String(content.results[i].base_resistance) + " (+ " + String(rta_resistance) + ")",
                    inline: true,
                }, {
                    name: '   ',
                    value: '   ',
                }, {
                    name: 'Speed',
                    value: String(content.results[i].base_speed) + " (+ " + String(rta_speed) + ")",
                    inline: true,
                }, {
                    name: 'Précision',
                    value: String(content.results[i].base_accuracy) + " (+ " + String(rta_accuracy) + ")",
                    inline: true,
                })

            
            listImg.push(imageMonster);
            listEmbed.push(embed, embedRTA);

        await interaction.editReply({ embeds: listEmbed, files: listImg });
        }}
}

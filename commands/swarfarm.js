const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const json = require('../config.json');
const fetch = require('node-fetch');

async function getPage(url) {
    const response = await fetch(url , {
            headers: {
              Accept: "application/json",
              "X-Csrftoken": "vNPF8DuKt4JkYxrnBC7dR0G59bVm5FJo8mMzFAiz0c3eUFwT9rqRuvhCY2S9C9gJ"
            }
          })
        return response.json();
}

async function getImage(response)  {
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

            const name = interaction.options.getString('name');
            const owner = interaction.options.getString('owner');

        url = `https://swarfarm.com/api/v2/profiles/${owner}/monsters/?monster__name=${name}`;
        //récupérer sur un endpoint 

          //récupérer le json
            const content = await getPage(url);

            //console.log(content);
            let total_ATK = content.results[0].rune_attack + content.results[0].base_attack;
            let total_DEF = content.results[0].rune_defense + content.results[0].base_defense;
            let total_HP = content.results[0].rune_hp + content.results[0].base_hp;
            let total_SPD = content.results[0].rune_speed + content.results[0].base_speed;
            let total_TC = content.results[0].rune_crit_rate + content.results[0].base_crit_rate;
            let total_DC = content.results[0].rune_crit_damage + content.results[0].base_crit_damage;
            let total_RES = content.results[0].rune_resistance + content.results[0].base_resistance;
            let total_ACC = content.results[0].rune_accuracy + content.results[0].base_accuracy;

            let test = await getImage(content);

            console.log(test);
            let imageMonster = new AttachmentBuilder(test, { name: 'image.png' });

            const embed = new EmbedBuilder()
            .setTitle(`${name.toUpperCase()}`)
            .setDescription(`De ${owner}`)
            .setThumbnail(`attachment://image.png`)
            .addFields({
                name:'   ',
                value: '   ',
            }, {
                name: 'HP',
                value: String(total_HP) + " (+ " + String(content.results[0].rune_hp) + ")",
                inline: true,   
                color: 0x00ff00,
            }, {
                name: 'Crit. Rate',
                value: String(total_TC) + " (+ " + String(content.results[0].rune_crit_rate) + ")",
                inline: true,
            }, {
                name:'   ',
                value: '   ',
            }, {
                name: 'ATK',
                value: String(total_ATK) + " (+ " + String(content.results[0].rune_attack) + ")",
                inline: true,
            }, {
                name: 'Crit. Damage',
                value: String(total_DC) + " (+ " + String(content.results[0].rune_crit_damage) + ")",
                inline: true,
            }, {
                name:'   ',
                value: '   ',
            }, {
                name: 'DEF',
                value: String(total_DEF)+ " (+ " + String(content.results[0].rune_defense) + ")",
                inline: true,
            }, {
                name: 'Résistance',
                value: String(total_RES) + " (+ " + String(content.results[0].rune_resistance) + ")",
                inline: true,
            }, {
                name:'   ',
                value: '   ',
            }, {
                name: 'Speed',
                value: String(total_SPD) + " (+ " + String(content.results[0].rune_speed) + ")",
                inline: true,
            }, {
                name: 'Précision',
                value: String(total_ACC) + " (+ " + String(content.results[0].rune_accuracy) + ")",
                inline: true,
            })

            //si le monstre n'est pas trouvé 
        await interaction.reply({ embeds: [embed],  files: [imageMonster]   });
        // const content = [];
    }
}


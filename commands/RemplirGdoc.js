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



module.exports = {
    data: new SlashCommandBuilder()
        .setName('listing')
        .setDescription('Remplir le Gdoc avec les infos des monstres d\'un invocateur référencé dans Swarfarm')
        .addStringOption(option => option.setName('owner').setDescription('The owner of the monster').setRequired(true)),


    async execute(interaction) {

        await interaction.deferReply();

        const owner = interaction.options.getString('owner');

        const membername = interaction.member.user.username;

        url = `https://swarfarm.com/api/v2/profiles/${owner}/monsters`
        
        const content = await getPage(`https://swarfarm.com/api/v2/profiles/${formattingName(owner)}/monsters/`);
 
        const nbrMonsters = content.count;
        const monsters = content.results;
        const monster = monsters[0];
        const monsterId = monster.id;
        const monsterName = monster.name;

        for (let i = 0; i < nbrMonsters; i++) {
            const monster = monsters[i];
            const monsterId = monster.id;
            const monsterName = monster.name;
            monsterIdToName[monsterId] = monsterName;
            const monsterElement = monster.element;
            const monsterStars = monster.base_stars;
            const monsterLevel = monster.level;
            const monsterRune = monster.runes;
            const monsterSkill = monster.skills;
            const monsterLeaderSkill = monster.leader_skill;
            const monsterAwakened = monster.awaken_level;
            const monsterSkillUps = monster.skills
        }
    }
}
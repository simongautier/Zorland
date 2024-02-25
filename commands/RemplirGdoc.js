const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const json = require('../config.json');
const fetch = require('node-fetch');
const axios = require('axios');



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
        
        const content = await getPage(`https://swarfarm.com/api/v2/profiles/${owner}/monsters/`);


        const nbrMonsters = content.count;

        for (let i = 0; i < nbrMonsters; i++) {
            
            if (content.results[i].stars != 6 || content.results[i].level >= 30) {
                console.log(content.results[i].monster);
                console.log(content.results[i].level);
                console.log(i);
    

                monsterName = await getPage(`https://swarfarm.com/api/bestiary/${content.results[i].monster}`)
    
                monsterName = monsterName.name;
                //attend 0,2 sec 
                await new Promise(r => setTimeout(r, 200));
                
                axios.post('https://sheetdb.io/api/v1/yn567ib60rq3e', {
                    monster: monsterName,
                    level: content.results[i].level,
                    stars: content.results[i].stars
                })


                console.log(monsterName);
            }

        }


        return interaction.editReply(`Le Gdoc de ${owner} a été rempli avec succès`);
    }};
const { REST, Routes } = require('discord.js');
const { clientid, guildid, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');



const commands = [];
console.log('clientId: ' + clientid);
console.log('guildId: ' + guildid);
console.log('token: ' + token);
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        if (command && command.data && typeof command.data.toJSON === 'function') {
			console.log(`Commande "${file}" importée avec succès.`);
            commands.push(command.data.toJSON());
        } else {
            console.error(`Erreur: Commande "${file}" mal formée ou manquante de données appropriées.`);
        }
    } catch (error) {
        console.error(`Erreur lors de l'importation de la commande "${file}":`, error);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientid, guildid),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

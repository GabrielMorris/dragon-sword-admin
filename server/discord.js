// Discord
const Discord = require('discord.js');
const discordClient = new Discord.Client();

// Sign into KatBot
discordClient.login(process.env.TOKEN);

module.exports = discordClient;

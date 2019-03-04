// Express
const express = require('express');
const router = express.Router();

const characters = require('../models/character');

const discord = require('../discord');

// Utils
const { capitalizeFirstLetter } = require('../utils/utils');

// Routes
router.get('/', function(req, res) {
  characters.find().then(chars => {
    // Create an array to hold characters that are merged with Discord usernames
    const characterArray = [];

    // For every character get the user's current Discord username
    chars.forEach(char => {
      // I don't know why this is necessary but it sends some goddamn mongo document if I don't so...
      const {
        guildID,
        memberID,
        experience,
        health,
        mana,
        pronouns,
        gold
      } = char;
      const className = char.class;

      const charObj = {
        guildID,
        memberID,
        experience,
        health,
        mana,
        pronouns,
        gold,
        class: className
      };

      // Get the guild of the character
      const guild = discord.guilds.find(guild => guild.id === char.guildID);

      // Get the name of the guild the character is on
      const guildName = guild.name;

      // Add the guild's name to the character object
      charObj.guildName = guildName;

      // Get the member snowflake for the plaayer
      const member = guild.members.find(member => member.id === char.memberID);

      // Add the username to the character object
      charObj.username = member.user.username;

      // Capitalize the class name and pronouns
      charObj.class = capitalizeFirstLetter(className);
      charObj.pronouns = capitalizeFirstLetter(pronouns);

      // Push the modified character object with the username into the character array
      characterArray.push(charObj);
    });

    // Send the new character array to the client
    res.send(characterArray);
  });
});

module.exports = router;

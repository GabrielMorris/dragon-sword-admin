// Express
const express = require('express');
const router = express.Router();

// State
const state = require('../state/state.json');
const stateController = require('../state/state-controller');

// Models
const characters = require('../models/character');

const discord = require('../discord');

// Utils
const { capitalizeFirstLetter } = require('../utils/utils');

// Routes
router.get('/', function(req, res) {
  stateController.getState(() => {
    // Create an array to hold characters that are merged with Discord usernames
    const charactersArray = [];

    // For every character get the user's current Discord username
    state.characters.forEach(char => {
      const className = char.class;

      // Get the guild of the character
      const guild = discord.guilds.find(guild => guild.id === char.guildID);

      // Get the name of the guild the character is on
      const guildName = guild.name;

      // Add the guild's name to the character object
      char.guildName = guildName;

      // Get the member snowflake for the player
      const member = guild.members.find(member => member.id === char.memberID);

      // Add the username to the character object
      char.username = member.user.username;

      // Capitalize the class name and pronouns
      char.class = capitalizeFirstLetter(className);
      char.pronouns = capitalizeFirstLetter(char.pronouns);

      // Push the modified character object with the username into the character array
      charactersArray.push(char);
    });

    res.send(charactersArray);
  });
});

module.exports = router;

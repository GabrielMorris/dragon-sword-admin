const fs = require('fs');
const dbUtils = require('../db');
const Game = require('../models/game');
const Character = require('../models/character');
const Encounter = require('../models/encounter');
const Class = require('../models/class');
const Monster = require('../models/monster');

// State template
const stateTemplate = require('./state-template');

function getState() {
  dbUtils.getGameData(stateTemplate, (err, data) => {
    if (err) {
      console.log(err);

      return;
    }

    fs.writeFileSync('./state/state.json', JSON.stringify(data));
  });
}

function updateState(prop, data) {
  const validProps = [
    'characters',
    'classes',
    'encounters',
    'games',
    'monsters'
  ];

  // Throw an error if the prop is invalid
  if (!validProps.find(property => property === prop)) {
    throw new Error('Invalid property in updateState');
  }

  // Read the state json
  const state = fs.readFileSync('./state/state.json');

  // Parse the state and get the Mongo objectID we're going to update
  const parsedState = JSON.parse(state);
  const _id = data._id;

  // Find the array index of the item to be updated
  const itemIndex = parsedState[prop].findIndex(item => item._id === _id);

  // Update the item to the data we've received
  parsedState[prop][itemIndex] = data;

  // Write the new state
  fs.writeFileSync('./state/state.json', JSON.stringify(parsedState));
}

module.exports = { getState, updateState };

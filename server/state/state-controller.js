const fs = require('fs');
const dbUtils = require('../db');
const Game = require('../models/game');
const Character = require('../models/character');
const Encounter = require('../models/encounter');
const Class = require('../models/class');
const Monster = require('../models/monster');
const state = require('../state/state.json');

// State template
const stateTemplate = require('./state-template');

function getState(callback = null) {
  dbUtils.getGameData(stateTemplate, (err, data) => {
    if (err) {
      console.log('ERRORO =====');
      console.log(err);

      return;
    }

    fs.writeFileSync('./state/state.json', JSON.stringify(data));
    console.log('hello');
    if (callback) callback();
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
  // const state = fs.readFileSync('./state/state.json');

  // Parse the state and get the Mongo objectID we're going to update
  const parsedState = state;
  const _id = data._id;

  // Find the array index of the item to be updated
  const itemIndex = parsedState[prop].findIndex(item => item._id === _id);

  // Update the item to the data we've received
  parsedState[prop][itemIndex] = data;

  // Write the new state
  fs.writeFileSync('./state/state.json', JSON.stringify(parsedState));

  if (prop === 'characters') {
    console.log('need to update characters');

    Character.update({ _id }, parsedState[prop][itemIndex]).then(res => {
      // console.log(res);
    });
  } else if (prop === 'classes') {
    console.log('need to update classes');

    Class.update({ _id }, parsedState[prop][itemIndex]).then(res => {
      // console.log(res);
    });
  } else if (prop === 'encounters') {
    console.log('need to update encounters');

    Encounter.update({ _id }, parsedState[prop][itemIndex]).then(res => {
      // console.log(res);
    });
  } else if (prop === 'games') {
    console.log('need to update game');

    Game.update({ _id }, parsedState[prop][itemIndex]).then(res => {
      // console.log(res);
    });
  } else if (prop === 'monsters') {
    console.log('need to update monsters');

    Monster.update({ _id }, parsedState[prop][itemIndex]).then(res => {
      // console.log(res);
    });
  }
}

module.exports = { getState, updateState };

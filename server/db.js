const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Game = require('./models/game');
const Character = require('./models/character');
const Encounter = require('./models/encounter');
const Class = require('./models/class');
const Monster = require('./models/monster');

const DATABASE_URL = `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASS
}@ds151805.mlab.com:51805/katia_boticata`;

function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(url, { useNewUrlParser: true }).catch(err => {
    console.error('Mongoose failed to connect');
    console.error(err);
  });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbGet() {
  return mongoose;
}

function getGameData(template, callback) {
  Game.find().then(games => {
    if (games.length === 0) {
      return callback('No games', null);
    }

    template.games = games;

    Character.find().then(characters => {
      if (characters.length === 0) {
        return callback('No characters', null);
      }

      template.characters = characters;

      Encounter.find().then(encounters => {
        if (encounters.length === 0) {
          return callback('No encounters', null);
        }

        template.encounters = encounters;

        Class.find().then(classes => {
          if (classes.length === 0) {
            return callback('No classes', null);
          }

          template.classes = classes;

          Monster.find().then(monsters => {
            if (monsters.length === 0) {
              return callback('No monsters', null);
            }

            template.monsters = monsters;

            callback(null, template);
          });
        });
      });
    });
  });
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet,
  getGameData
};

// Express
const express = require('express');
const router = express.Router();

// State
const state = require('../state/state.json');
const stateController = require('../state/state-controller');

// Models
const games = require('../models/game');

const fs = require('fs');

// Routes
// Get all games
router.get('/', function(req, res) {
  const file = fs.readFileSync('./state/state.json');
  console.log(file.toString());
  res.send(JSON.parse(file.toString()).games);
  // stateController.getState(() => {
  //   res.send(state.games);
  // });
});

// Get a game by guild ID
router.get('/:guildId', function(req, res) {
  const { guildId } = req.params;

  stateController.getState(() => {
    const guildGame = state.games.find(game => game.guildID === guildId);

    res.send(guildGame);
  });
});
// router.get('/:guildId', function(req, res) {
//   const { guildId } = req.params;

//   games
//     .findOne({ guildID: guildId })
//     .then(doc => {
//       if (!doc) return res.send({});

//       res.send(doc);
//     })
//     .catch(err => {
//       res.status(500).send({ error: true, message: err.message });
//     });
// });

module.exports = router;

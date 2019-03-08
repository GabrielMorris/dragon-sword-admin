// Express
const express = require('express');
const router = express.Router();

const games = require('../models/game');

// Routes
// Get all games
router.get('/', function(req, res) {
  games.find().then(games => res.send(games));
});

// Get a game by guild ID
router.get('/:guildId', function(req, res) {
  const { guildId } = req.params;

  games
    .findOne({ guildID: guildId })
    .then(doc => {
      if (!doc) return res.send({});

      res.send(doc);
    })
    .catch(err => {
      res.status(500).send({ error: true, message: err.message });
    });
});

module.exports = router;

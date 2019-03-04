// Express
const express = require('express');
const router = express.Router();

const games = require('../models/game');

// Routes
router.get('/', function(req, res) {
  games.find().then(games => res.send(games));
});

module.exports = router;

// Express
const express = require('express');
const router = express.Router();

const monsters = require('../models/monster');

// Routes
router.get('/', function(req, res) {
  monsters.find().then(monsters => res.send(monsters));
});

module.exports = router;

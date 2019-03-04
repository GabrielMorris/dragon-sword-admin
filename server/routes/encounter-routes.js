// Express
const express = require('express');
const router = express.Router();

const encounters = require('../models/encounter');

// Routes
router.get('/', function(req, res) {
  encounters.find().then(encounters => res.send(encounters));
});

module.exports = router;

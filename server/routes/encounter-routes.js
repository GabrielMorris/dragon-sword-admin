// Express
const express = require('express');
const router = express.Router();

// State
const state = require('../state/state.json');
const stateController = require('../state/state-controller');

// Models
const encounters = require('../models/encounter');

// Auth
const authMiddleware = require('../middleware/auth');

// Routes
router.get('/', function(req, res) {
  stateController.getState(() => {
    res.send(state.encounters);
  });
});

router.post('/', authMiddleware, function(req, res) {
  // Find any encounters with the same text
  encounters.find({ text: req.text }).then(encounterDocs => {
    // If we have a duplicate send an error
    if (encounterDocs.length > 0) {
      return res.status(400).send({
        error: true,
        message: 'Encounter with that text already exists'
      });
    }

    // Otherwise create a new encounter doc
    encounters
      .create({ text: req.body.text })
      .then(encounter => res.send(encounter))
      .catch(err =>
        res.status(500).send({ error: true, message: err.message })
      );
  });
});

module.exports = router;

// Express
const express = require('express');
const router = express.Router();

// State
const state = require('../state/state.json');
const stateController = require('../state/state-controller');

// Models
const classes = require('../models/class');

// Auth
const authMiddleware = require('../middleware/auth');

// Routes
router.get('/', function(req, res) {
  stateController.getState(() => {
    res.send(state.classes);
  });
});

// Create a new class
router.post('/', authMiddleware, function(req, res) {
  classes
    .create(req.body)
    .then(response => {
      res.send(response);

      stateController.getState();
    })
    .catch(err => res.status(500).send({ error: true, message: err.message }));
});

module.exports = router;

// Express
const express = require('express');
const router = express.Router();

const classes = require('../models/class');

// Auth
const authMiddleware = require('../middleware/auth');

// Routes
// Get all characters
router.get('/', function(req, res) {
  classes.find().then(classes => res.send(classes));
});

// Create a new character
router.post('/', authMiddleware, function(req, res) {
  classes
    .create(req.body)
    .then(response => res.send(response))
    .catch(err => res.status(500).send({ error: true, message: err.message }));
});

module.exports = router;

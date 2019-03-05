// Express
const express = require('express');
const router = express.Router();

const monsters = require('../models/monster');

// Auth
const authMiddleware = require('../middleware/auth');

// Routes
router.get('/', function(req, res) {
  monsters.find().then(monsters => res.send(monsters));
});

router.post('/', authMiddleware, function(req, res) {
  // Find any monsters with the same name
  monsters.find({ name: req.body.name }).then(mongoDocs => {
    // If we've got any monsters with the same name respond with an error
    if (mongoDocs.length > 0) {
      return res.status(400).send({
        error: true,
        message: 'Monster with that name already exists'
      });
    }

    // Otherwise create the new monster
    monsters
      .create(req.body)
      .then(response => res.send(response))
      .catch(err =>
        res.status(500).send({ error: true, message: err.message })
      );
  });
});

module.exports = router;

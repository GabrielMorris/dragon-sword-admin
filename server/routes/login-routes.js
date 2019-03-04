// Express
const express = require('express');
const router = express.Router();

// Routes
router.get('/', function(req, res) {
  res.send({ user: req.auth.user, pass: req.auth.password });
});

module.exports = router;

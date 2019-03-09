// Express
const express = require('express');
const router = express.Router();

const testChar = require('../models/test-characters');
// Routes
router.get('/', function(req, res) {
  testChar
    .find()
    .populate('class')
    .then(response => {
      console.log(response);
      res.send(response);
    });
});

router.post('/', function(req, res) {
  testChar.create(req.body).then(response => {
    console.log(response);
  });
});

module.exports = router;

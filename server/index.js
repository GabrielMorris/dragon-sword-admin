const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Create a new MongoClient
const client = new MongoClient(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds151805.mlab.com:51805/katia_boticata`,
  { useNewUrlParser: true }
);

// Use connect method to connect to the Server
client.connect(function(err) {
  if (err) {
    console.log('Mongo connection error');
  }

  console.log('Connected successfully to server');
});

client.once('open', () => {
  // Multi-process to utilize all CPU cores.
  if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);
    z;

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.error(
        `Node cluster worker ${
          worker.process.pid
        } exited: code ${code}, signal ${signal}`
      );
    });
    zxzx;
  } else {
    const app = express();
    const db = client.db('katia_boticata');

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Answer API requests.
    app.get('/api', function(req, res) {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Hello from the custom server!"}');
    });

    // Send all characters
    app.get('/api/characters', function(req, res) {
      const characters = db.collection('characters');

      characters
        .find()
        .toArray()
        .then(chars => {
          res.send(chars);
        });
    });

    // Send all games
    app.get('/api/games', function(req, res) {
      const games = db.collection('games');

      games
        .find()
        .toArray()
        .then(games => res.send(games));
    });

    // Send all monsters
    app.get('/api/monsters', function(req, res) {
      const monsters = db.collection('monsters');

      monsters
        .find()
        .toArray()
        .then(monsters => res.send(monsters));
    });

    app.get('/api/encounters', function(req, res) {
      const encounters = db.collection('encounters');

      encounters
        .find()
        .toArray()
        .then(encounters => res.send(encounters));
    });

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
      response.sendFile(
        path.resolve(__dirname, '../react-ui/build', 'index.html')
      );
    });

    app.listen(PORT, function() {
      console.error(
        `Node ${
          isDev ? 'dev server' : 'cluster worker ' + process.pid
        }: listening on port ${PORT}`
      );
    });
  }
});

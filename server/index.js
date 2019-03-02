const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');
const discordClient = new Discord.Client();

const { capitalizeFirstLetter } = require('./utils/utils');

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

  console.log('Connected successfully to Mongo');

  // Sign into KatBot
  discordClient.login(process.env.TOKEN);
});

client.once('open', () => {
  // Multi-process to utilize all CPU cores.
  if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

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
  } else {
    // When KatBot is signed into
    discordClient.on('ready', () => {
      console.log('Discord connected');

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

        // Get all of the characters
        characters
          .find()
          .toArray()
          .then(chars => {
            // Create an array to hold characters that are merged with Discord usernames
            const characterArray = [];

            // For every character get the user's current Discord username
            chars.forEach(char => {
              // Get the guild of the character
              const guild = discordClient.guilds.find(
                guild => guild.id === char.guildID
              );

              // Get the name of the guild the character is on
              const guildName = guild.name;

              // Add the guild's name to the character object
              char.guildName = guildName;

              // Get the member snowflake for the plaayer
              const member = guild.members.find(
                member => member.id === char.memberID
              );

              // Add the username to the character object
              char.username = member.user.username;

              // Capitalize the class name and pronouns
              char.class = capitalizeFirstLetter(char.class);
              char.pronouns = capitalizeFirstLetter(char.pronouns);

              // Push the modified character object with the username into the character array
              characterArray.push(char);
            });

            // Send the new character array to the client
            res.send(characterArray);
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
    });
  }
});

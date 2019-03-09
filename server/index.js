const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const morgan = require('morgan');

// Env vars
require('dotenv').config();

// DB
const dbUtils = require('./db');

// State controller
const stateController = require('./state/state-controller');

// Discord
const discord = require('./discord');

// Auth
const authMiddleware = require('./middleware/auth');

// Routers
const monsterRouter = require('./routes/monster-routes');
const characterRouter = require('./routes/character-routes');
const gameRouter = require('./routes/game-routes');
const encounterRouter = require('./routes/encounter-routes');
const loginRouter = require('./routes/login-routes');
const classRouter = require('./routes/class-routes');

const testRouter = require('./routes/test-chars-routes');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

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
  discord.on('ready', () => {
    console.log('Discord connected');

    stateController.getState();

    // setTimeout(() => {
    //   stateController.updateState('classes', {
    //     _id: '5c81ed2d533c384fe4a1543a',
    //     name: 'hater',
    //     base: { HP: 10, MP: 0, STR: 10, DEF: 10, AGI: 1, LUCK: 1 },
    //     growth: { HP: 2, MP: 0, STR: 3, DEF: 2, AGI: 1, LUCK: 1 },
    //     isMage: false,
    //     description:
    //       "An iron will bound to unshakeable resolve, the Crusader's oath once given is never broken. A veteran of many wars, they seek to purify this land from the Taint.",
    //     thumbnail: 'https://i.imgur.com/OQ3PN4B.png',
    //     createdAt: '2019-03-08T04:18:53.697Z',
    //     updatedAt: '2019-03-08T04:18:53.697Z',
    //     __v: 0
    //   });
    // }, 5000);

    const app = express();

    // Logging
    app.use(morgan('dev'));

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Parse request body
    app.use(express.json());

    // Mount routers
    app.use('/api/monsters', monsterRouter);
    app.use('/api/characters', characterRouter);
    app.use('/api/games', gameRouter);
    app.use('/api/encounters', encounterRouter);
    app.use('/api/login', authMiddleware, loginRouter);
    app.use('/api/class', classRouter);

    app.use('/api/test', testRouter);

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

if (require.main === module) {
  dbUtils.dbConnect();
}

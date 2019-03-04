const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DATABASE_URL = `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASS
}@ds151805.mlab.com:51805/katia_boticata`;

function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(url).catch(err => {
    console.error('Mongoose failed to connect');
    console.error(err);
  });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbGet() {
  return mongoose;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};

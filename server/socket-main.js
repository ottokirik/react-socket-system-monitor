const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/perfData');

const Machine = require('./models/Machine');

const socketMain = (io, socket) => {
  socket.on('clientAuth', (token) => {
    if (token === 'TqhhIICJCKesUUdOYNnOyb9LoQtnb+B9d/') {
      socket.join('clients');
    } else if (token === 'tdeuVhMa7+hj983d2cOdFo6s2bbIegNqh6v67M') {
      // valid ui token has joined
      socket.join('ui');
    } else {
      // an invalid token
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', async (data) => {
    const mongooseResponse = await checkAndAdd(data);
  });

  socket.on('perfData', (data) => {
    console.log('Tick...');
    io.to('ui').emit('data', data);
  });
};

const checkAndAdd = async (data) => {
  try {
    const doc = await Machine.findOne({ macA: data.macA });

    if (doc === null) {
      new Machine(data).save();
      return 'added';
    }

    return 'found';
  } catch (err) {
    throw new Error('DB is unreachable');
  }
};

module.exports = socketMain;
